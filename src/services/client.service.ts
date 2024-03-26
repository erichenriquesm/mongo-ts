import { PrismaClient } from "@prisma/client";
import prismaClient from "../prisma/index.js";
import { Iclient } from "../interfaces/create-client.js";

export class ClientService {
    private prisma:PrismaClient;
    constructor(){
        this.prisma = prismaClient;
    }
    public async create(resources:Iclient){        
        const client = await this.prisma.client.create({
            data: {
                name: resources.name,
                email: resources.email,
                status: true
            }
        });

        return client;
    }

    public async list(page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const clients = await this.prisma.client.findMany({
            skip,
            take: pageSize,
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

    public async show(id:string){
        return await this.prisma.client.findUnique({
            where: {
                id: id
            }
        });
    }

    public async update(id:string, data: Partial<Iclient>){
        const client =  await this.prisma.client.update({
            where : {
                id: id
            },
            data: data
        });

        return {message: 'Client updated!', client};
    }

    public async delete(id:string){
        await this.prisma.client.delete({
            where : {
                id: id
            }
        });

        return {message: 'Client deleted!'};
        
    }
}