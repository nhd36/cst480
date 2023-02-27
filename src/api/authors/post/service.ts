import { Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser, Author } from "../../common.js";
import { createUniqueId } from "../../../utility.js";

const service = async (db: Database, reqParaser: RequestParser, res: Response<CustomResponse>) => {
    // Generate unique ID for this new author
    const id: string = createUniqueId();

    // Parsing body into SQL statement
    let statement = await db.prepare("INSERT INTO authors(id, name, bio, username) VALUES (?, ?, ?, ?)");
    await statement.bind([id, reqParaser.Body.name, reqParaser.Body.bio, reqParaser.Body.username]);
    await statement.run();
    await statement.finalize();

    const newAuthor: Author = {
        id,
        name: reqParaser.Body.name,
        bio: reqParaser.Body.bio,
        username: reqParaser.Body.username
    }

    const response: CustomResponse = {
        message: "success",
        statusCode: 200,
        data: newAuthor
    }
    return res.status(200).json(response)
}

export default service;