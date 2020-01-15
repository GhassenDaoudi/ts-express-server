import {
    HttpServer
} from "./HttpServer";
import {
    Application,
    RequestHandler
} from "express";
import {
    Controller
} from "./Controller";

//express middlewares
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

export class ApiServer implements HttpServer {
    constructor(
        private readonly express: Application,
        private readonly controllers: Controller[]
    ) {}

    private addRoute(method: 'get' | 'post' | 'put' | 'delete' | 'all', url: string, requestHandler: RequestHandler, middlewares: RequestHandler[]): void {
        this.express[method](url, ...middlewares, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        })
        console.log(`Added route ${method.toUpperCase()}: ${url}`);
    }
    get(url: string, requestHandler: RequestHandler, ...middlewares: RequestHandler[]): void {
        this.addRoute("get", url, requestHandler, middlewares);
    }
    post(url: string, requestHandler: RequestHandler, ...middlewares: RequestHandler[]): void {
        this.addRoute("post", url, requestHandler, middlewares);
    }
    put(url: string, requestHandler: RequestHandler, ...middlewares: RequestHandler[]): void {
        this.addRoute("put", url, requestHandler, middlewares);
    }
    delete(url: string, requestHandler: RequestHandler, ...middlewares: RequestHandler[]): void {
        this.addRoute("delete", url, requestHandler, middlewares);
    }
    all(url: string, requestHandler: RequestHandler, ...middlewares: RequestHandler[]): void {
        this.addRoute("all", url, requestHandler, middlewares);
    }

    /*get(url: string, requestHandler: RequestHandler): void {
        this.addRoute("get", url, requestHandler);
    }
    post(url: string, requestHandler: RequestHandler): void {
        this.addRoute("post", url, requestHandler);
    }
    put(url: string, requestHandler: RequestHandler): void {
        this.addRoute("put", url, requestHandler);
    }
    delete(url: string, requestHandler: RequestHandler): void {
        this.addRoute("delete", url, requestHandler);
    }
    all(url: string, requestHandler: RequestHandler): void {
        this.addRoute("all", url, requestHandler);
    }*/



    public start(port: number): void {
        this.express.use(helmet());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(morgan("combined"));


        this.controllers.forEach(controller => controller.init(this))

        this.express.listen(port, () => {
            console.log(`Server is up and running on port: ${port}`);
        })
    }
}