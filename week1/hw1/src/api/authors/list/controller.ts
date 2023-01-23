import { Request, Response } from "express";
import { Database } from "sqlite";
import { RequestParser } from "../../common.js";
import listService from "./service.js";
import { QueryParam } from "./type.js";

const controller = async (db: Database, req: Request, res: Response) => {

    // Parse query param from request
    const queryParam: QueryParam = {
        name: <string>req.query?.name || null
    }

    // Aggregate into Request Parser
    const reqParser: RequestParser = {
        QueryParam: queryParam,
        Body: null,
        Header: null,
        PathParam: null,
        ExtraData: null
    }

    return listService(db, reqParser, res);
}

export default controller;