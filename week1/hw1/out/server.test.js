import axios from "axios";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as url from "url";
// Setup variables for testing
let port = 3000;
let host = "localhost";
let protocol = "http";
let baseUrl = `${protocol}://${host}:${port}`;
let __dirname = url.fileURLToPath(new URL("..", import.meta.url));
let dbfile = `${__dirname}database.db`;
let db = await open({
    filename: dbfile,
    driver: sqlite3.Database,
});
await db.get("PRAGMA foreign_keys = ON");
const fakeAuthor1 = {
    name: 'Nam Dao',
    bio: 'A very handsome dude'
};
const fakeAuthor2 = {
    name: 'Galen Long',
    bio: 'A very knowledgable professor'
};
const insertRandomData = async () => {
    let statement1 = await db.prepare("INSERT INTO authors(id, name, bio) VALUES('1', 'Nam Dao', 'A very handsome gentleman.')");
    let statement2 = await db.prepare("INSERT INTO authors(id, name, bio) VALUES('2', 'Galen Long', 'A very knowledgable professor')");
    await statement1.run();
    await statement2.run();
    await statement1.finalize();
    await statement2.finalize();
};
const insertRandomBookData = async () => {
    let statement1 = await db.prepare("INSERT INTO books (id, title, genre, pub_year, author_id) VALUES ('1', 'Test 1', 'adventure', 2000, '1');");
    let statement2 = await db.prepare("INSERT INTO books (id, title, genre, pub_year, author_id) VALUES ('2', 'Test 2', 'thriller', 2012, '1');");
    let statement3 = await db.prepare("INSERT INTO books (id, title, genre, pub_year, author_id) VALUES ('3', 'Test 3', 'comedy', 2017, '2');");
    let statement4 = await db.prepare("INSERT INTO books (id, title, genre, pub_year, author_id) VALUES ('4', 'Test 4', 'family', 2022, '2');");
    let statement5 = await db.prepare("INSERT INTO books (id, title, genre, pub_year, author_id) VALUES ('5', 'Test 5', 'children', 2026, '2');");
    await statement1.run();
    await statement2.run();
    await statement3.run();
    await statement4.run();
    await statement5.run();
    await statement1.finalize();
    await statement2.finalize();
    await statement3.finalize();
    await statement4.finalize();
    await statement5.finalize();
};
// Reset database before going into each test
beforeEach(async () => {
    await db.run("DELETE FROM books");
    await db.run("DELETE FROM authors");
});
afterAll(async () => {
    await db.run("DELETE FROM books");
    await db.run("DELETE FROM authors");
});
// Authors API ------------------------------------------------------------------------------------------
describe("Authors API testing", () => {
    describe("GET /authors", () => {
        test("<200>: originally empty (no author)", async () => {
            let { status, data } = await axios.get(`${baseUrl}/authors`);
            expect(data).toEqual({ data: [], message: 'success', statusCode: 200 });
            expect(status).toEqual(200);
        });
        test("<200>: display authors", async () => {
            await insertRandomData();
            let { status, data } = await axios.get(`${baseUrl}/authors`);
            expect(data.data.length).toEqual(2);
            expect(status).toEqual(200);
        });
        test("<200>: search for author by name", async () => {
            await insertRandomData();
            let { status, data } = await axios.get(`${baseUrl}/authors?name=Nam`);
            expect(data.data.length).toEqual(1);
            expect(data.data[0].name).toEqual("Nam Dao");
            expect(status).toEqual(200);
        });
        test("<200>: search for author by false name", async () => {
            await insertRandomData();
            let { status, data } = await axios.get(`${baseUrl}/authors?name=VjpPro`);
            expect(data.data.length).toEqual(0);
            expect(status).toEqual(200);
        });
    });
    describe("POST /authors", () => {
        test("<200>: create new author with full body", async () => {
            await insertRandomData();
            const body = {
                name: "Nam Dao 1",
                bio: "VjpPro"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.post(`${baseUrl}/authors`, body, { headers });
            let { data } = await axios.get(`${baseUrl}/authors`);
            expect(status).toEqual(200);
            expect(data.data.length).toEqual(3);
        });
        test("<400>: create author by with missing part of body", async () => {
            await insertRandomData();
            const body = {
                name: "Nam Dao"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                await axios.post(`${baseUrl}/authors`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: create new author with full body but no header", async () => {
            await insertRandomData();
            const body = {
                name: "Test 1",
                bio: "VjpPro"
            };
            try {
                await axios.post(`${baseUrl}/authors`, body);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: create new author with no body", async () => {
            await insertRandomData();
            const body = {};
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                await axios.post(`${baseUrl}/authors`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
    });
    describe("GET /authors/:authorId", () => {
        test("<200>: get author by ID", async () => {
            await insertRandomData();
            let { status, data } = await axios.get(`${baseUrl}/authors/1`);
            expect(status).toEqual(200);
            expect(data.data).toEqual({ name: 'Nam Dao', bio: 'A very handsome gentleman.', id: '1' });
        });
        test("<404>: get author by wrong ID", async () => {
            await insertRandomData();
            try {
                let { status, data } = await axios.get(`${baseUrl}/authors/3`);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(data).toEqual({ message: "data not exists", statusCode: 404, data: null });
                expect(status).toEqual(404);
            }
        });
    });
    describe("PUT /authors/:authorId", () => {
        test("<200>: update author by ID", async () => {
            await insertRandomData();
            const body = {
                name: "Nam Dao 1",
                bio: "VjpPro"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.put(`${baseUrl}/authors/1`, body, { headers });
            let { data } = await axios.get(`${baseUrl}/authors/1`);
            expect(status).toEqual(200);
            expect(data.data.name).toEqual("Nam Dao 1");
            expect(data.data.bio).toEqual("VjpPro");
        });
        test("<200>: update author by ID only name", async () => {
            await insertRandomData();
            const body = {
                name: "Nam Dao 1"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.put(`${baseUrl}/authors/1`, body, { headers });
            let { data } = await axios.get(`${baseUrl}/authors/1`);
            expect(status).toEqual(200);
            expect(data.data.name).toEqual("Nam Dao 1");
            expect(data.data.bio).toEqual("A very handsome gentleman.");
        });
        test("<200>: update author by ID only bio", async () => {
            await insertRandomData();
            const body = {
                bio: "VjpPro"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.put(`${baseUrl}/authors/1`, body, { headers });
            let { data } = await axios.get(`${baseUrl}/authors/1`);
            expect(status).toEqual(200);
            expect(data.data.name).toEqual("Nam Dao");
            expect(data.data.bio).toEqual("VjpPro");
        });
        test("<400>: update author by ID no body", async () => {
            await insertRandomData();
            const body = {};
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                await axios.put(`${baseUrl}/authors/1`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "nothing to be updated", statusCode: 400 });
            }
        });
        test("<400>: update author by ID with body but no header", async () => {
            await insertRandomData();
            const body = {
                name: "Nam Dao"
            };
            try {
                await axios.put(`${baseUrl}/authors/1`, body);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "nothing to be updated", statusCode: 400 });
            }
        });
    });
    describe("DELETE /author/:authorId", () => {
        test("<200>: delete author by ID", async () => {
            await insertRandomData();
            let { status, data } = await axios.delete(`${baseUrl}/authors/1`);
            const records = await db.all("SELECT * FROM authors;");
            expect(status).toEqual(200);
            expect(data.message).toEqual("success");
            expect(records.length).toEqual(1);
            expect(records[0].name).toEqual("Galen Long");
        });
        test("<200>: delete more than one author", async () => {
            await insertRandomData();
            await axios.delete(`${baseUrl}/authors/1`);
            await axios.delete(`${baseUrl}/authors/2`);
            const records = await db.all("SELECT * FROM authors;");
            expect(records.length).toEqual(0);
        });
        test("<404>: delete author by non-existing ID", async () => {
            await insertRandomData();
            try {
                await axios.delete(`${baseUrl}/authors/3`);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(404);
                expect(data).toEqual({ data: null, message: "data not exists", statusCode: 404 });
                const records = await db.all("SELECT * FROM authors;");
                expect(records.length).toEqual(2);
            }
        });
        test("<400>: delete author associated with existing book", async () => {
            await insertRandomData();
            await insertRandomBookData();
            try {
                await axios.delete(`${baseUrl}/authors/1`);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "cannot delete this author; author associates with existing books", statusCode: 400 });
                const records = await db.all("SELECT * FROM authors;");
                expect(records.length).toEqual(2);
            }
        });
    });
});
// Books API ------------------------------------------------------------------------------------------
describe("Books API testing", () => {
    describe("GET /books", () => {
        test("<200>: originally empty (no book)", async () => {
            let { status, data } = await axios.get(`${baseUrl}/books`);
            expect(data).toEqual({ data: [], message: 'success', statusCode: 200 });
            expect(status).toEqual(200);
        });
        test("<200>: list books", async () => {
            await insertRandomData();
            await insertRandomBookData();
            let { status, data } = await axios.get(`${baseUrl}/books`);
            expect(data.data.length).toEqual(5);
            expect(status).toEqual(200);
        });
        test("<200>: search for books with pub_year/from", async () => {
            await insertRandomData();
            await insertRandomBookData();
            let { status, data } = await axios.get(`${baseUrl}/books?from=2015`);
            expect(data.data.length).toEqual(3);
            expect(status).toEqual(200);
        });
        test("<200>: search for books with pub_year/to", async () => {
            await insertRandomData();
            await insertRandomBookData();
            let { status, data } = await axios.get(`${baseUrl}/books?to=2015`);
            expect(data.data.length).toEqual(2);
            expect(status).toEqual(200);
        });
        test("<200>: search for books with book title/title", async () => {
            await insertRandomData();
            await insertRandomBookData();
            let { status, data } = await axios.get(`${baseUrl}/books?title=3`);
            expect(data.data.length).toEqual(1);
            expect(data.data[0].title).toEqual("Test 3");
            expect(status).toEqual(200);
        });
        test("<200>: combining all query params/title & from & to", async () => {
            await insertRandomData();
            await insertRandomBookData();
            let { status, data } = await axios.get(`${baseUrl}/books?from=2010&to=2020&title=3`);
            expect(data.data.length).toEqual(1);
            expect(data.data[0].title).toEqual("Test 3");
            expect(status).toEqual(200);
        });
    });
    describe("POST /books", () => {
        test("<200>: create new book with valid full body", async () => {
            await insertRandomData();
            const body = {
                title: "Test 1",
                pub_year: 2020,
                genre: "adventure",
                author: "1"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.post(`${baseUrl}/books`, body, { headers });
            let records = await db.all("SELECT * FROM books;");
            expect(status).toEqual(200);
            expect(records.length).toEqual(1);
            expect(records[0].title).toEqual("Test 1");
            expect(records[0].pub_year).toEqual("2020");
            expect(records[0].genre).toEqual("adventure");
            expect(records[0].author_id).toEqual("1");
        });
        test("<400>: create book with missing part of body", async () => {
            await insertRandomData();
            const body = {
                title: "Test 1",
                pub_year: 2020,
                author: "1"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                await axios.post(`${baseUrl}/books`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: create new author with full body but no header", async () => {
            await insertRandomData();
            const body = {
                title: "Test 1",
                pub_year: 2020,
                genre: "adventure",
                author: "1"
            };
            try {
                await axios.post(`${baseUrl}/books`, body);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: create new book with no body", async () => {
            await insertRandomData();
            const body = {};
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                await axios.post(`${baseUrl}/books`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: create new book with non-existing author", async () => {
            const body = {
                title: "Test 1",
                pub_year: 2020,
                genre: "adventure",
                author: "1"
            };
            try {
                await axios.post(`${baseUrl}/books`, body);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(404);
                expect(data).toEqual({ data: null, message: "author not exists", statusCode: 404 });
            }
        });
    });
    describe("GET /books/:bookId", () => {
        test("<200>: get book by ID", async () => {
            await insertRandomData();
            await insertRandomBookData();
            //'1', 'Test 1', 'adventure', 2000, '1'
            let { status, data } = await axios.get(`${baseUrl}/books/1`);
            expect(status).toEqual(200);
            expect(data.data).toEqual({ id: '1', title: 'Test 1', genre: 'adventure', pubYear: '2000', author: '1' });
        });
        test("<404>: get book by wrong ID", async () => {
            await insertRandomData();
            await insertRandomBookData();
            try {
                await axios.get(`${baseUrl}/books/adawfw`);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(data).toEqual({ message: "data not exists", statusCode: 404, data: null });
                expect(status).toEqual(404);
            }
        });
    });
    describe("PUT /books/:bookId", () => {
        test("<200>: update book by ID", async () => {
            await insertRandomData();
            await insertRandomBookData();
            const body = {
                title: "Test Modify",
                pub_year: 1999,
                genre: "messiiiiiiiiiiiiii",
                author: "2"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.put(`${baseUrl}/books/1`, body, { headers });
            let records = await db.all("SELECT * FROM books WHERE id = '1';");
            expect(status).toEqual(200);
            expect(records[0].title).toEqual("Test Modify");
            expect(records[0].pub_year).toEqual("1999");
            expect(records[0].genre).toEqual("messiiiiiiiiiiiiii");
            expect(records[0].author_id).toEqual("2");
        });
        test("<200>: update book by ID missing part of the body", async () => {
            await insertRandomData();
            await insertRandomBookData();
            const body = {
                title: "Nam Dao 1"
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let { status } = await axios.put(`${baseUrl}/books/1`, body, { headers });
            let records = await db.all("SELECT * FROM books WHERE id = '1';");
            expect(status).toEqual(200);
            expect(records[0].title).toEqual("Nam Dao 1");
        });
        test("<404>: update book by non-existing ID", async () => {
            await insertRandomData();
            const headers = {
                "Content-Type": "application/json"
            };
            const body = {
                title: "Test Modify",
                pub_year: 1999,
                genre: "messiiiiiiiiiiiiii",
                author: "2"
            };
            try {
                await axios.post(`${baseUrl}/books`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(404);
                expect(data).toEqual({ data: null, message: "data not exists", statusCode: 404 });
            }
        });
        test("<400>: update book by ID with incorrect keys value", async () => {
            await insertRandomData();
            await insertRandomBookData();
            const headers = {
                "Content-Type": "application/json"
            };
            const body = {
                name: "Test 1",
                pub: 2020,
                generous: "adventure",
                authorsss: "1"
            };
            try {
                await axios.post(`${baseUrl}/books`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: update book by ID with no body", async () => {
            await insertRandomData();
            await insertRandomBookData();
            const body = {};
            const headers = {
                "Content-Type": "application/json"
            };
            try {
                await axios.post(`${baseUrl}/books`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<400>: update book by ID with body but no header", async () => {
            await insertRandomData();
            await insertRandomBookData();
            const body = {
                title: "Test Modify"
            };
            try {
                await axios.post(`${baseUrl}/books`, body);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(400);
                expect(data).toEqual({ data: null, message: "one of the field is null", statusCode: 400 });
            }
        });
        test("<404>: update book with non-existing author ID", async () => {
            await insertRandomData();
            const headers = {
                "Content-Type": "application/json"
            };
            const body = {
                title: "Test Modify",
                pub_year: 1999,
                author: "3"
            };
            try {
                await axios.put(`${baseUrl}/books/1`, body, { headers });
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(404);
                expect(data).toEqual({ data: null, message: "author not exists", statusCode: 404 });
            }
        });
    });
    describe("DELETE /books/:bookId", () => {
        test("<200>: delete book by ID", async () => {
            await insertRandomData();
            await insertRandomBookData();
            let { status, data } = await axios.delete(`${baseUrl}/books/1`);
            const records = await db.all("SELECT * FROM books;");
            expect(status).toEqual(200);
            expect(data.message).toEqual("success");
            expect(records.length).toEqual(4);
        });
        test("<200>: delete more than one book", async () => {
            await insertRandomData();
            await insertRandomBookData();
            await axios.delete(`${baseUrl}/books/1`);
            await axios.delete(`${baseUrl}/books/2`);
            const records = await db.all("SELECT * FROM books;");
            expect(records.length).toEqual(3);
        });
        test("<404>: delete book by non-existing ID", async () => {
            await insertRandomData();
            try {
                await axios.delete(`${baseUrl}/books/1`);
            }
            catch (error) {
                let errorObj = error;
                if (errorObj.response === undefined) {
                    throw errorObj;
                }
                const { response } = errorObj;
                const { status, data } = response;
                expect(status).toEqual(404);
                expect(data).toEqual({ data: null, message: "data not exists", statusCode: 404 });
                const records = await db.all("SELECT * FROM authors;");
                expect(records.length).toEqual(2);
            }
        });
    });
});
// Sample API-------------------------------------------------------------------------------------------
test("GET /foo?bar returns message", async () => {
    let bar = "xyzzy";
    let { data } = await axios.get(`${baseUrl}/foo?bar=${bar}`);
    expect(data).toEqual({ message: `You sent: ${bar} in the query` });
});
test("GET /foo returns error", async () => {
    try {
        await axios.get(`${baseUrl}/foo`);
    }
    catch (error) {
        // casting needed b/c typescript gives errors "unknown" type
        let errorObj = error;
        // if server never responds, error.response will be undefined
        // throw the error so typescript can perform type narrowing
        if (errorObj.response === undefined) {
            throw errorObj;
        }
        // now, after the if-statement, typescript knows
        // that errorObj can't be undefined
        let { response } = errorObj;
        // TODO this test will fail, replace 300 with 400
        expect(response.status).toEqual(400);
        expect(response.data).toEqual({ error: "bar is required" });
    }
});
test("POST /bar works good", async () => {
    let bar = "xyzzy";
    let result = await axios.post(`${baseUrl}/foo`, { bar });
    expect(result.data).toEqual({ message: `You sent: ${bar} in the body` });
});
