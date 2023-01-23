import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as url from "url";
let app = express();
app.use(express.json());
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
    await db.run("INSERT INTO authors(id, name, bio) VALUES('1', 'Figginsworth III', 'A traveling gentleman.')");
    await db.run("INSERT INTO books(id, author_id, title, pub_year, genre) VALUES ('1', '1', 'My Fairest Lady', '1866', 'romance')");
    // insert example with parameterized queries
    // important to use parameterized queries to prevent SQL injection
    // when inserting untrusted data
    let statement = await db.prepare("INSERT INTO books(id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)");
    await statement.bind(["2", "1", "A Travelogue of Tales", "1867", "adventure"]);
    await statement.run();
    // select examples
    let authors = await db.all("SELECT * FROM authors");
    console.log("Authors", authors);
    let books = await db.all("SELECT * FROM books WHERE author_id = '1'");
    console.log("Books", books);
    let filteredBooks = await db.all("SELECT * FROM books WHERE pub_year = '1867'");
    console.log("Some books", filteredBooks);
    // res's type limits what responses this request handler can send
    // it must send either an object with a message or an error
    app.get("/foo", (req, res) => {
        if (!req.query.bar) {
            return res.status(400).json({ error: "bar is required" });
        }
        return res.json({ message: `You sent: ${req.query.bar} in the query` });
    });
    app.post("/foo", (req, res) => {
        if (!req.body.bar) {
            return res.status(400).json({ error: "bar is required" });
        }
        return res.json({ message: `You sent: ${req.body.bar} in the body` });
    });
    app.delete("/foo", (req, res) => {
        // etc.
        res.sendStatus(200);
    });
    //
    // ASYNC/AWAIT EXAMPLE
    //
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // need async keyword on request handler to use await inside it
    app.get("/bar", async (req, res) => {
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
};
await sample();
// -------------------------- APIs -------------------------------
// import { listBooks, getBookById } from "./api/books/controller.js";
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
app.get("/authors", async (req, res) => {
    console.log("List all authors");
    return listAuthors(db, req, res);
});
app.post("/authors", async (req, res) => {
    console.log("Create new author");
    return createAuthor(db, req, res);
});
app.get("/authors/:authorId", async (req, res) => {
    console.log("Get Author By ID");
    return getAuthor(db, req, res);
});
app.delete("/authors/:authorId", async (req, res) => {
    console.log("Delete Author By ID");
    return deleteAuthor(db, req, res);
});
app.put("/authors/:authorId", async (req, res) => {
    console.log("Update Author By ID");
    return updateAuthor(db, req, res);
});
app.post("/books", async (req, res) => {
    console.log("Create new book");
    return createBook(db, req, res);
});
app.get("/books/:bookId", async (req, res) => {
    console.log("Get Book By ID");
    return getBook(db, req, res);
});
app.delete("/books/:bookId", async (req, res) => {
    console.log("Delete Book By ID");
    return deleteBook(db, req, res);
});
app.get("/books", async (req, res) => {
    console.log("List all books");
    return listBook(db, req, res);
});
app.put("/books/:bookId", async (req, res) => {
    console.log("Update Book By ID");
    return updateBook(db, req, res);
});
// ---------------------------------------------------------------
// run server
let port = 3000;
let host = "localhost";
let protocol = "http";
app.listen(port, host, () => {
    console.log(`${protocol}://${host}:${port}`);
});
