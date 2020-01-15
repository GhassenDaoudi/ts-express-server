import { Request, Response, NextFunction } from "express";

export const test = (req:Request,res:Response,next:NextFunction)=>{
    console.log("skrrr");
    console.log("hhh");
    
    next();
}