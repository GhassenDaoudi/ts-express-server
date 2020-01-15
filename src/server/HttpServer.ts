import { RequestHandler } from "express";
export interface HttpServer {
    get(url: string, requestHandler: RequestHandler,...middlewares:RequestHandler[]): void;
    post(url: string, requestHandler: RequestHandler,...middlewares:RequestHandler[]): void;
    put(url: string, requestHandler: RequestHandler,...middlewares:RequestHandler[]): void;
    delete(url: string, requestHandler: RequestHandler,...middlewares:RequestHandler[]): void;
    all(url: string, requestHandler: RequestHandler,...middlewares:RequestHandler[]): void;
}