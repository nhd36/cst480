import { Database } from "sqlite";
import { Request, Response } from "express";
import { CustomResponse, RequestParser } from "../../common.js";
import { Body } from "./type.js";
import { verifyNonNull } from "../../../utility.js";
import service from "./service.js";

const controller = async (db: Database, req: Request, res: Response<CustomResponse>) => {
    // Parsing body message
    const body: Body = {
        title: <string>req.body?.title,
        genre: <string>req.body?.genre,
        pubYear: <Number>Number.parseInt(req.body?.pub_year) || null,
        author: <string>req.body?.author,
        username: res.locals.username
    }

    if (!verifyNonNull(["title", "genre", "pubYear", "author"], body)) {
        let response: CustomResponse = {
            message: "one of the field is null",
            data: null,
            statusCode: 400
        }
        return res.status(400).json(response);
    }

    // Aggregate into Request Parser
    const reqParser: RequestParser = {
        Body: body,
        Header: null,
        PathParam: null,
        QueryParam: null,
        ExtraData: null
    }

    return service(db, reqParser, res);
}

export default controller;