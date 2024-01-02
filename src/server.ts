import express from "express";
import { DataSource } from "typeorm";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { ConfigServer } from "./config/config";
import { UserRouter } from "./user/user.router";
class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    public port: number = this.getNumberEnv("PORT") || 8000;

    constructor() {
        super();
        this.app.use(express.json());
        this.passportUse();
        this.dbConnect();
        this.app.use("/api", this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [new UserRouter().router];
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }
    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Connect Success");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port= ${this.port}`);
        });
    }
}
let serverBootstrap = new ServerBootstrap();
