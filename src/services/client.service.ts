import { PrismaClient } from "@prisma/client";
import prismaClient from "../prisma/index.js";

interface ICreateClient {
    name: string,
    email: string
}

export class ClientService {
    private prisma:PrismaClient;
    constructor(){
        this.prisma = prismaClient;
    }
    public async create(resources:ICreateClient){
        const client = this.prisma.client.create({
            data: {
                name: resources.name,
                email: resources.email,
                status: true
            }
        });

        return client;
    }

    public async list(){
        return this.prisma.client.findMany();
    }
}