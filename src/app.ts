import Express from 'express';

export class App {
    public server: Express.Application
    constructor(){
        this.server = Express();
        this.middleware();
    }

    private middleware(){
        this.server.use(Express.json());
    }
}