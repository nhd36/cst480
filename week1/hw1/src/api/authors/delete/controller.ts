import { Request, Response } from "express";
import { Database } from "sqlite";
import { RequestParser } from "../../common.js";
import service from "./service.js";
import { PathParam } from "./type.js";

const controller = async (db: Database, req: Request, res: Response) => {
    const pathParam: PathParam = {
        authorId: req.params.authorId
    }

    const reqParser: RequestParser = {
        PathParam: pathParam,
        Body: null,
        QueryParam: null,
        Header: null,
        ExtraData: null
    }

    return service(db, reqParser, res);
}

export default controller;