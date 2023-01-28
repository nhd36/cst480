import { Database } from "sqlite";
import { Response } from "express";
import { CustomResponse, Author, RequestParser } from "../../common.js";

const service = async (db: Database, reqParser: RequestParser, res: Response<CustomResponse>) => {
    // Make query to the datbase
    let queryStatement: string = "SELECT * FROM authors";
    if (reqParser.QueryParam.name) {
        queryStatement = `${queryStatement} WHERE name LIKE '%${reqParser.QueryParam.name}%'`;
    }
    const authors: Array<Author> = await db.all(`${queryStatement};`);

    // Make response object
    const response: CustomResponse = {
        data: authors,
        message: "success",
        statusCode: 200
    }

    return res.status(200).json(response);
}

export default service;