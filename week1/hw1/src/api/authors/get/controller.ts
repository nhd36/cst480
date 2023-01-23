import { Request, Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser } from "../../common.js";
import service from "./service.js";
import { PathParam } from "./type.js";

const controller = async (db: Database, req: Request, res: Response<CustomResponse>) => {
    const pathParam: PathParam = {
        authorId: <string>req.params.authorId
    }
    const reqParser: RequestParser = {
        PathParam: pathParam,
        Body: null,
        QueryParam: null,
        ExtraData: null,
        Header: null
    }
    return service(db, reqParser, res);
}

export default controller;