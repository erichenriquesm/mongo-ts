import { PrismaClient } from "@prisma/client";
import prismaClient from "../prisma/index.js";
import { ILogin } from "../interfaces/login.js";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'; 
import { IClient } from "../interfaces/client.js";
dotenv.config({ path: '../../.env' });

export class ClientService {
    private prisma: PrismaClient;
    private mainColumns: object;

    constructor() {
        this.prisma = prismaClient;
        this.mainColumns = {
            id: true,
            name: true,
            email: true,
            status: true,
            createdAt: true,
            updatedAt: true
        };
    }

    public async create(resources: IClient) {
        const client = await this.prisma.client.create({
            data: {
                name: resources.name,
                email: resources.email,
                status: true,
                password: resources.password
            },
            select: this.mainColumns
        });

        return client;
    }

    public async login(credentials: ILogin) {
        const client = await this.prisma.client.findUnique({
            where: {
                email: credentials.email
            }
        });

        if (!client) {
            return;
        }

        const isMatch = await bcrypt.compare(credentials.password, client.password);

        if(!isMatch){
            return;
        }

        const { password, ...clientJson } = client;

        return this.generateToken(clientJson);
    }

    public async list(page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const clients = await this.prisma.client.findMany({
            skip,
            take: pageSize,
            select: this.mainColumns
        });
        const totalRecords = await this.prisma.client.count();
        const totalPages = Math.ceil(totalRecords / pageSize);

        return {
            data: clients,
            pagination: {
                totalRecords,
                totalPages,
                currentPage: page,
                pageSize
            }
        };
    }

    public async show(id: string) {
        return await this.prisma.client.findUnique({
            where: {
                id: id
            },
            select: this.mainColumns
        });
    }

    public async update(id: string, data: Partial<IClient>) {
        const client = await this.prisma.client.update({
            where: {
                id: id
            },
            data: data
        });

        return { message: 'Client updated!', client };
    }

    public async delete(id: string) {
        await this.prisma.client.delete({
            where: {
                id: id
            }
        });

        return { message: 'Client deleted!' };
    }

    private generateToken(client: Partial<IClient>) {
        const secret = process.env.JWT_SECRET || '';
        const expiresIn = process.env.EXPIRES_IN || '1h';

        return {
            token: jwt.sign(client, secret, { expiresIn }),
            expiresIn
        };
    }
}