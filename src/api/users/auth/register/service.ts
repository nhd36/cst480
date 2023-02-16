import { Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser, Book } from "../../../common.js";
import argon2 from "argon2";


const service = async (db: Database, reqParaser: RequestParser, res: Response<CustomResponse>) => {
    let response: CustomResponse = {
        message: null,
        data: null,
        statusCode: null
    }

    // Check if user exists
    let user = await db.get(`SELECT * FROM users WHERE username = '${reqParaser.Body.username}'`)

    if (user) {
        response.message = "user already exists";
        response.statusCode = 400;
        return res.status(400).json(response);
    }

    // Hashing password
    const passwordHash: string = await argon2.hash(reqParaser.Body.password);

    // Insert data into database
    let statement = await db.prepare("INSERT INTO users(username, password) VALUES (?, ?)");
    await statement.bind([reqParaser.Body.username, passwordHash]);
    await statement.run();
    await statement.finalize();

    response.message = "success";
    response.statusCode = 200;
    return res.status(200).json(response)
}

export default service;