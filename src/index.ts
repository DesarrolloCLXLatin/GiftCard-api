import { Application } from './Application';

async function startServer(): Promise<void> {
    const app = new Application();
    await app.start();
}

startServer();
