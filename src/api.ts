import Express from 'express';
import * as dotenv from 'dotenv';
import clientRouter from './routes/client-routes.js';
dotenv.config({ path: '../.env' });

const app =Express();

app.listen(process.env.APP_PORT || 3000);

app.use(Express.json());

app.use('/client', clientRouter);

app.get('/health', async () => {
    return 'Ok';
});
