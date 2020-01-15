import { HttpServer } from "./httpServer";

export interface Controller {
    init(httpServer: HttpServer):void;
}