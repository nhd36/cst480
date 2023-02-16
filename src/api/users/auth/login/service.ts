import { CookieOptions, Response } from "express";
import { Database } from "sqlite";
import { CustomResponse, RequestParser, Book } from "../../../common.js";
import argon2 from "argon2"
import jwt, { SignOptions } from "jsonwebtoken"

let cookieOptions: CookieOptions = {
    // httpOnly: true, // JS can't access it
    secure: true, // only sent over HTTPS connections
    sameSite: "strict", // only sent to this domain
};

const service = async (db: Database, reqParaser: RequestParser, res: Response<CustomResponse>) => {
    let response: CustomResponse = {
        message: null,
        data: null,
        statusCode: null
    }

    // Check if user exists
    let user = await db.get(`SELECT * FROM users WHERE username = '${reqParaser.Body.username}'`)

    if (!user) {
        response.message = "user not exists";
        response.statusCode = 404;
        return res.status(404).json(response);
    }

    const matching: boolean = await argon2.verify(user.password, reqParaser.Body.password)

    // Check if user password matches
    if (!matching) {
        response.statusCode = 401;
        response.message = "Incorrect username or password";
        return res.status(401).json(response);
    }

    // Generate JWT
    const token: string = jwt.sign(user.username, "SecretVaiLon");

    response.message = "success";
    response.statusCode = 200;
    return res.status(200).cookie("authToken", token, cookieOptions).json(response)
}

export default service;