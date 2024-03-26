import express, { Request, Response } from 'express';
import { ClientController } from '../controllers/client.controller.js';

const clientRouter = express.Router();

const clientController = new ClientController();

clientRouter.post('/', async (req: Request, res: Response) => {
    await clientController.create(req, res);
});

clientRouter.post('/login', async (req: Request, res: Response) => {
    await clientController.login(req, res);
});


clientRouter.get('/', async (req: Request, res: Response) => {
    await clientController.list(req, res);
});

clientRouter.get('/:id', async (req: Request, res: Response) => {
    await clientController.show(req, res);
});

clientRouter.put('/:id', async (req: Request, res: Response) => {
    await clientController.update(req, res);
});

clientRouter.delete('/:id', async (req: Request, res: Response) => {
    await clientController.delete(req, res);
});

export default clientRouter;
