import express from "express";
import { ApiServer } from "./server";
import { HelloController } from "./controllers/HelloController";
const expressDriver = express();

const controllers = [new HelloController]

const server = new ApiServer(expressDriver,controllers);
server.start(3001);