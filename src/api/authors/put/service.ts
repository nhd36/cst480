import { Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser } from "../../common.js";

const service = async (db: Database, reqParser: RequestParser, res: Response<CustomResponse>) => {
    let response: CustomResponse = {
        message: null,
        data: null,
        statusCode: null
    };

    // Create update string
    let update: Array<string> = [];

    for (let key in reqParser.Body) {
        if (reqParser.Body[key] === null || reqParser.Body[key] === undefined) {
            continue;
        }
        update.push(`${key} = '${reqParser.Body[key]}'`);
    }

    if (update.length === 0) {
        response.message = "nothing to be updated";
        response.statusCode = 400
        return res.status(400).json(response);
    }

    // Get Author ID
    const updateStr: string = update.join(",");

    // Parsing body into SQL statement
    let result = await db.run(`UPDATE authors SET ${updateStr} WHERE id = '${reqParser.PathParam.authorId}' AND username = '${reqParser.Body.username}';`);

    // Check if ID exists
    if (result.changes === 0) {
        response.message = "unauthorized operation";
        response.statusCode = 401;
        return res.status(401).json(response);
    }

    response.message = "success";
    response.statusCode = 200;

    return res.status(200).json(response);
}

export default service;