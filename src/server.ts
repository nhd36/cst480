import express, { Request, RequestHandler, Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as url from "url";
import cors from "cors";
import { parseToken } from "./utility.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

let app = express();
app.use(express.json());
app.use(cors<Request>());
app.use(cookieParser());
app.use(helmet());

app.use(express.static('public'));

// create database "connection"
// use absolute path to avoid this issue
// https://github.com/TryGhost/node-sqlite3/issues/441
let __dirname = url.fileURLToPath(new URL("..", import.meta.url));
let dbfile = `${__dirname}database.db`;
let db = await open({
    filename: dbfile,
    driver: sqlite3.Database,
});
await db.get("PRAGMA foreign_keys = ON");

const sample = async () => {
    //
    // SQLITE EXAMPLES
    // comment these out or they'll keep inserting every time you run your server
    // if you get 'UNIQUE constraint failed' errors it's because
    // this will keep inserting a row with the same primary key
    // but the primary key should be unique
    //

    // insert example
    await db.run(
        "INSERT INTO authors(id, name, bio) VALUES('1', 'Figginsworth III', 'A traveling gentleman.')"
    );
    await db.run(
        "INSERT INTO books(id, author_id, title, pub_year, genre) VALUES ('1', '1', 'My Fairest Lady', '1866', 'romance')"
    );

    // insert example with parameterized queries
    // important to use parameterized queries to prevent SQL injection
    // when inserting untrusted data
    let statement = await db.prepare(
        "INSERT INTO books(id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)"
    );
    await statement.bind(["2", "1", "A Travelogue of Tales", "1867", "adventure"]);
    await statement.run();

    // select examples
    let authors = await db.all("SELECT * FROM authors");
    console.log("Authors", authors);
    let books = await db.all("SELECT * FROM books WHERE author_id = '1'");
    console.log("Books", books);
    let filteredBooks = await db.all("SELECT * FROM books WHERE pub_year = '1867'");

    console.log("Some books", filteredBooks);

    //
    // EXPRESS EXAMPLES
    //

    // GET/POST/DELETE example
    interface Foo {
        message: string;
    }
    interface Error {
        error: string;
    }
    type FooResponse = Response<Foo | Error>;
    // res's type limits what responses this request handler can send
    // it must send either an object with a message or an error
    app.get("/foo", (req, res: FooResponse) => {
        if (!req.query.bar) {
            return res.status(400).json({ error: "bar is required" });
        }
        return res.json({ message: `You sent: ${req.query.bar} in the query` });
    });
    app.post("/foo", (req, res: FooResponse) => {
        if (!req.body.bar) {
            return res.status(400).json({ error: "bar is required" });
        }
        return res.json({ message: `You sent: ${req.body.bar} in the body` });
    });
    app.delete("/foo", (_req, res) => {
        // etc.
        res.sendStatus(200);
    });

    //
    // ASYNC/AWAIT EXAMPLE
    //

    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // need async keyword on request handler to use await inside it
    app.get("/bar", async (_req, res: FooResponse) => {
        console.log("Waiting...");
        // await is equivalent to calling sleep.then(() => { ... })
        // and putting all the code after this in that func body ^
        await sleep(3000);
        // if we omitted the await, all of this code would execute
        // immediately without waiting for the sleep to finish
        console.log("Done!");
        return res.sendStatus(200);
    });
    // test it out! while server is running:
    // curl http://localhost:3000/bar
}

// await sample();

// -------------------------- APIs -------------------------------
// import { listBooks, getBookById } from "./controller.js";
import listAuthors from "./api/authors/list/controller.js";
import createAuthor from "./api/authors/post/controller.js";
import getAuthor from "./api/authors/get/controller.js";
import deleteAuthor from "./api/authors/delete/controller.js";
import updateAuthor from "./api/authors/put/controller.js";

import createBook from "./api/books/post/controller.js";
import getBook from "./api/books/get/controller.js";
import deleteBook from "./api/books/delete/controller.js";
import listBook from "./api/books/list/controller.js";
import updateBook from "./api/books/put/controller.js";

import loginUser from "./api/users/auth/login/controller.js";
import registerUser from "./api/users/auth/register/controller.js";

const authorRouter = express.Router();

let authorize: RequestHandler = (req: Request, res: Response, next) => {
    if (req.cookies === undefined) {
        return res.status(401).json({
            statusCode: 401,
            message: "missing credentials",
            data: null
        });
    }
    // TODO only allow access if user logged in
    // by sending error response if they're not
    const { authToken } = req.cookies;
    if (authToken === undefined) {
        return res.status(401).json({
            statusCode: 401,
            message: "unauthorized",
            data: null
        });
    }
    
    const username = parseToken(authToken);
    if (username === null) {
        return res.status(401).json({
            statusCode: 401,
            message: "invalid crendentials",
            error: null
        });
    }
    res.locals.username = username;
    next();
};

// const test = (_req: Request, _res: Response, next: any) => {
//     console.log("Hello World")
//     next();
// };

authorRouter.get("", authorize, async (req: Request, res: Response) => {
    console.log("List all authors");
    return listAuthors(db, req, res);
});

authorRouter.post("", authorize, async (req: Request, res: Response) => {
    console.log("Create new author");
    return createAuthor(db, req, res);
});

authorRouter.get("/:authorId", authorize, async (req: Request, res: Response) => {
    console.log("Get Author By ID");
    return getAuthor(db, req, res);
});

authorRouter.delete("/:authorId", authorize, async (req: Request, res: Response) => {
    console.log("Delete Author By ID");
    return deleteAuthor(db, req, res);
});

authorRouter.put("/:authorId", authorize, async (req: Request, res: Response) => {
    console.log("Update Author By ID");
    return updateAuthor(db, req, res);
});

const bookRouter = express.Router();

bookRouter.post("", authorize, async (req: Request, res: Response) => {
    console.log("Create new book");
    return createBook(db, req, res);
});

bookRouter.get("/:bookId", authorize, async (req: Request, res: Response) => {
    console.log("Get Book By ID");
    return getBook(db, req, res);
});

bookRouter.delete("/:bookId", authorize, async (req: Request, res: Response) => {
    console.log("Delete Book By ID");
    return deleteBook(db, req, res);
});

bookRouter.get("", authorize, async (req: Request, res: Response) => {
    console.log("List all books");
    return listBook(db, req, res);
});

bookRouter.put("/:bookId", authorize, async (req: Request, res: Response) => {
    console.log("Update Book By ID");
    return updateBook(db, req, res);
});

const authRouter = express.Router();

authRouter.post("/login", async (req:  Request, res: Response) => {
    console.log("User Login");
    return loginUser(db, req, res);
});

authRouter.post("/register", async (req: Request, res: Response) => {
    console.log("User Register");
    return registerUser(db, req, res);
});

authRouter.get("/authorize", authorize, async(req: Request, res: Response) => {
    console.log("User Authorized")
    return res.status(200).json({
        message: "success",
        statusCode: 200,
        data: res.locals.username
    });
});

app.use("/api/user", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter);
// ---------------------------------------------------------------

// run server
let port = 3000;
let host = "localhost";
let protocol = "http";
app.listen(port, host, () => {
    console.log(`${protocol}://${host}:${port}`);
});
