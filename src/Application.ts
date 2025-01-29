import { ExpressServer } from './ExpressServer';
import {routes} from './routes'; 
import { env } from './env';

export class Application {
    private server: ExpressServer;

    constructor() {
        this.server = new ExpressServer(routes);
        this.server.build();
    }

    public async start(): Promise<void> {
        await this.server.start(env.API_PORT);
    }
}
