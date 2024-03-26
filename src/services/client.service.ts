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
        const client = await this.prisma.client.create({
            data: {
                name: resources.name,
                email: resources.email,
                status: true
            }
        });

        return client;
    }

    public async list(){
        return await this.prisma.client.findMany();
    }

    public async show(id:string){
        return await this.prisma.client.findUnique({
            where: {
                id: id
            }
        });
    }

    public async update(id:string, data){
        return await this.prisma.client.update({
            where : {
                id: id
            },
            data: data
        });
        
    }
}