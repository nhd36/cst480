import { Request, Response } from "express";
import { Database } from "sqlite";
import { RequestParser } from "../../common.js";
import service from "./service.js";
import { PathParam, Body } from "./type.js";

const controller = async (db: Database, req: Request, res: Response) => {
    const pathParam: PathParam = {
        bookId: req.params.bookId
    }

    const body: Body = {
        username: res.locals.username
    }

    const reqParser: RequestParser = {
        PathParam: pathParam,
        Body: body,
        QueryParam: null,
        Header: null,
        ExtraData: null
    }

    return service(db, reqParser, res);
}

export default controller;