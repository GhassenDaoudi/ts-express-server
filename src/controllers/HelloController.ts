import {
    Controller
} from "../server/Controller";
import {
    HttpServer
} from "../server/HttpServer";
import {
    Request,
    Response,
    NextFunction
} from "express";
import { test } from "../middlewares/test";

export class HelloController implements Controller {
    init(httpServer: HttpServer): void {
        httpServer.get("/",this.sayHello.bind(this),test,test)
    }
    private async sayHello(req: Request, res: Response, next: NextFunction): Promise < void > {
        res.send("Hello")
    }

}