// src/ExpressServer.ts
import express, { Express, Request, Response, NextFunction, Router } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { routes } from './routes';

export class ExpressServer {
    private server!: Express;
    public http?: Server;
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public build(): void {
        this.server = express();
        this.setupSecurity();
        this.setupMiddleware();
        this.setupRoutes();
    }

    public async start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.http = this.server.listen(port, () => {
                console.log(`🚀 App started on port: ${port}`);
                resolve();
            }).on('error', (err) => {
                console.error('Error starting server:', err);
                reject(err);
            });
        });
    }

    private setupSecurity(): void {
        this.server.use(
            cors({
                origin: '*',
                credentials: true,
            })
        );
    }

    private setupMiddleware(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
    }

    private setupRoutes(): void {
        this.server.use(routes);
    }
}
