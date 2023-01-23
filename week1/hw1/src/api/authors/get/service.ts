import e, { Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser, Author } from "../../common.js";

const service = async (db: Database, reqParser: RequestParser, res: Response<CustomResponse>) => {

    // Writing callback function for SQL statement.
    const callbackFunc = (err: Error, row: any) => {
        let response: CustomResponse = {
            message: null,
            data: null,
            statusCode: null
        }
        if (err !== null) {
            response.message = err.message;
            response.statusCode = 500;
            return res.status(500).json(response);
        } else if (row === undefined) {
            response.message = "data not exists";
            response.statusCode = 404;
            return res.status(404).json(response);
        }
        const author: Author = {
            id: row.id,
            name: row.name,
            bio: row.bio
        }
        response = {
            message: "success",
            data: author,
            statusCode: 200
        }
        return res.status(200).json(response);
    }

    // Make SQL query statement
    var statement = await db.prepare(`SELECT * FROM authors WHERE id = '${reqParser.PathParam.authorId}';`);
    statement.stmt.get(callbackFunc);
    statement.finalize();
}

export default service;