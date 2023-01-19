import express from "express";
import { ConfigServer } from "./config/config";
import { UserRouter } from "./router/user.router";
class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    public port: number =this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use("/api", this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [new UserRouter().router];
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port= ${this.port}`);
        });
    }
}
let serverBootstrap = new ServerBootstrap();
