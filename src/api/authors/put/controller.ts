import { Database } from "sqlite";
import { RequestParser } from "../../common.js";
import service from "./service.js";
import { Response, Request } from "express";
import { Body, PathParam } from "./type.js";

const controller = async (db: Database, req: Request, res: Response) => {

    const pathParam: PathParam = {
        authorId: req.params.authorId
    }

    const body: Body = {
        name: <string>req.body.name || null,
        bio: <string>req.body.bio || null,
        username: res.locals.username
    }

    const reqParser: RequestParser = {
        Body: body,
        PathParam: pathParam,
        Header: null,
        QueryParam: null,
        ExtraData: null
    }

    return service(db, reqParser, res);
}

export default controller;