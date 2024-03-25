import { Request, Response } from "express";
import { ClientService } from "../services/client.service.js";

export class ClientController {
    private clientService: ClientService;
    constructor(){
        this.clientService = new ClientService()
    }

    public async create(req: Request, res: Response){
        const {name, email} = req.body as {name: string, email: string};
        
        if(!name || !email){
            throw new Error('Preencha todos os dados');
        }

        return await this.clientService.create({name, email});
    }

    public async list(){
        return await this.clientService.list();
    }
}