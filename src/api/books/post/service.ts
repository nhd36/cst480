import { Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser, Book, Author } from "../../common.js";
import { createUniqueId } from "../../../utility.js";

const service = async (db: Database, reqParaser: RequestParser, res: Response<CustomResponse>) => {
    let response: CustomResponse = {
        message: null,
        data: null,
        statusCode: null
    }

    // Check if author exists
    let record = await db.get(`SELECT * FROM authors WHERE id = '${reqParaser.Body.author}';`)

    if (record === null || record === undefined) {
        response.message = "author not exists";
        response.statusCode = 404;
        return res.status(404).json(response);
    }

    // Generate unique ID for this new book
    const id: string = createUniqueId();

    // Parsing body into SQL statement
    let statement = await db.prepare("INSERT INTO books(id, author_id, title, pub_year, genre, username) VALUES (?, ?, ?, ?, ?, ?);");
    await statement.bind([id, reqParaser.Body.author, reqParaser.Body.title, reqParaser.Body.pubYear, reqParaser.Body.genre, reqParaser.Body.username]);
    await statement.run();
    await statement.finalize();

    const newBook: Book = {
        id,
        title: reqParaser.Body.title,
        pubYear: reqParaser.Body.pubYear,
        genre: reqParaser.Body.genre,
        author: reqParaser.Body.author,
        username: reqParaser.Body.username
    }

    response = {
        message: "success",
        statusCode: 200,
        data: newBook
    }
    return res.status(200).json(response)
}

export default service;