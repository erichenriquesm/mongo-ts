import Express, { Request, Response } from 'express';
import clientRouter from './routes/client-routes.js';
import * as dotenv from 'dotenv'; 
dotenv.config({ path: '../.env' });

const app =Express();

app.listen(process.env.APP_PORT || 3000);

app.use(Express.json());

app.use('/client', clientRouter);

app.get('/health', async (req: Request, res: Response) => {
    return res.send('Ok');
});
