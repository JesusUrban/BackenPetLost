import express, { Router } from "express";

/**
 * 
 * Interface representing the ports and the routes
 */
interface Options{
    port: number;
    routes: Router;
}

/**
 * Class representing on Express Server
 * 
 * @example
 * ````ts
 * import {Server} from "./presentation/server";
 * import {AppRoutes} from "./presentation/routes";
 * cost server = new Server({
 * port: 3000,
 * routes: AppRoutes
 * });
 * 
 * 
 * ````
 */
export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(option:Options){
        this.port = option.port;
        this.routes = option.routes;

    }

    async start(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
      
        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port} 👨‍🦰`)
        });
   
    }
}