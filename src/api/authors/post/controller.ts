import { Database } from "sqlite";
import { Request, Response } from "express";
import { CustomResponse, RequestParser } from "../../common.js";
import { Body } from "./type.js";
import { verifyNonNull } from "../../utility.js";
import service from "./service.js";

const controller = async (db: Database, req: Request, res: Response<CustomResponse>) => {
    // Parsing body message
    const body: Body = {
        name: <string>req.body?.name || null,
        bio: <string>req.body?.bio || null
    }

    if (!verifyNonNull(["name", "bio"], body)) {
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