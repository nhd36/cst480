import { Database } from "sqlite";
import { Response } from "express";
import { CustomResponse, RequestParser, Book } from "../../common.js";

const service = async (db: Database, reqParser: RequestParser, res: Response<CustomResponse>) => {
    let conditions: Array<string> = [];

    // Make query to the datbase
    if (reqParser.QueryParam.title) {
        conditions.push(`title LIKE '%${reqParser.QueryParam.title}%'`);
    }
    if (reqParser.QueryParam.from) {
        conditions.push(`pub_year >= ${reqParser.QueryParam.from}`);
    }
    if (reqParser.QueryParam.to) {
        conditions.push(`pub_year <= ${reqParser.QueryParam.to}`);
    }

    let queryStatement: string = "SELECT * FROM books";

    if (conditions.length > 0) {
        const conditionStr: string = conditions.join(" AND ");
        queryStatement = `${queryStatement} WHERE ${conditionStr}`;
    }

    const books: Array<Book> = await db.all(`${queryStatement};`);

    // Make response object
    const response: CustomResponse = {
        data: books,
        message: "success",
        statusCode: 200
    }

    return res.status(200).json(response);
}

export default service;