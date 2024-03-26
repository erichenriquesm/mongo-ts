import { Request, Response } from "express";
import { ClientService } from "../services/client.service.js";
import { ICreateClient } from "../interfaces/create-client.js";
import { PrismaClient } from "@prisma/client";
import prismaClient from "../prisma/index.js";
import * as bcrypt from 'bcrypt';
import { ILogin } from "../interfaces/login.js";

export class ClientController {
    private clientService: ClientService;
    private prisma: PrismaClient;
    constructor() {
        this.clientService = new ClientService();
        this.prisma = prismaClient;
    }

    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body as ICreateClient;

        if (!name || !email || !password || password && password.length < 8) {
            return res.status(422).send('Verify your credentials');
        }

        const hash = await bcrypt.hash(password, 10);

        const clientCount = Number(await this.prisma.client.count({
            where: {
                email: email
            }
        }));
        
        if(clientCount){
            return res.status(422).send('Email already in use');
        }

        return res.send(await this.clientService.create({ name, email, password: hash }));
    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body as ILogin;

        if (!email || !password) {
            return res.status(422).send('Verify your credentials');
        }

        const result = await this.clientService.login({ email, password });

        if(!result){
            return res.status(422).send('Verify your credentials');
        }

        return res.send(result);
    }

    public async list(req: Request, res: Response) {
        return res.send(await this.clientService.list(Number(req.query.page ?? 1),Number(req.query.per_page ?? 10)));
    }

    public async show(req: Request, res: Response) {
        const id: string = req.params.id;
        const client = await this.clientService.show(id);
        if (!client) {
            return res.status(404).send('Client not found');
        }
        return res.send(client);
    }

    public async update(req: Request, res: Response) {
        try {
            const data: Partial<ICreateClient> = req.body;
            const id: string = req.params.id;
            return res.send(await this.clientService.update(id, data));
        }catch(error: any | {code:string}){
            if(error && error.code && error.code === 'P2025'){
                return res.status(404).send('Client not found');
            }
            return res.send(error)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            return res.send(await this.clientService.delete(id));
        }catch(error: any | {code:string}){
            if(error && error.code && error.code === 'P2025'){
                return res.status(404).send('Client not found');
            }
            return res.send(error)
        }
    }
}