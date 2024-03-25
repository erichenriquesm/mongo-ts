import { App } from './app.js';
import {Request, Response} from 'express';
import * as dotenv from 'dotenv';
import { ExampleController } from './controllers/example.controller.js';
import { ClientController } from './controllers/client.controller.js';
dotenv.config({ path: '../.env' });

const app = new App();

app.server.listen(process.env.APP_PORT || 3000);

app.server.get('/health', async (req: Request, res: Response) => {
    const exampleController = new ExampleController();
    res.send(await exampleController.test());
});

app.server.post('/client', async (req: Request, res: Response) => {
    const clientController = new ClientController();
    res.send(await clientController.create(req, res));
});

app.server.get('/client', async (req: Request, res: Response) => {
    const clientController = new ClientController();
    res.send(await clientController.list());
});