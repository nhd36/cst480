import { Database } from "sqlite";
import { RequestParser } from "../../common.js";
import service from "./service.js";
import { Response, Request } from "express";
import { Body, PathParam } from "./type.js";

const controller = async (db: Database, req: Request, res: Response) => {

    const pathParam: PathParam = {
        bookId: req.params.bookId
    }

    const body: Body = {
        title: <string>req.body.title || null,
        genre: <string>req.body.genre || null,
        author_id: <string>req.body.author || null,
        pub_year: Number.parseInt(<string>req.body.pub_year) || null,
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