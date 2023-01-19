import { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { BaseRouter } from "./router";

export class UserRouter extends BaseRouter<UserController>{

  constructor(){
    super(UserController);
  }

  routes(): void {
    this.router.get('/user', (req: Request, res: Response) =>this.controller.getUser(req, res));
  }
}