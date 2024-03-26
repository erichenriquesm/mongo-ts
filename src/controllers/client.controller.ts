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
            res.status(422).send('Preencha todos os dados');
        }

        res.send(await this.clientService.create({name, email}));
    }

    public async list(res: Response){
        res.send(await this.clientService.list());
    }

    public async show(req: Request, res: Response){
        const id:string = req.params.id;
        const client = await this.clientService.show(id);
        if(!client){
            res.status(404).send('Client not found');
        }
        res.send(client);
    }

    public async update(req: Request, res: Response){
        const data = req.body;
        const id:string = req.params.id;
        res.send(await this.clientService.update(id, data));
    }
}