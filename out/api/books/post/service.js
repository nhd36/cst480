import { createUniqueId } from "../../utility.js";
const service = async (db, reqParaser, res) => {
    let response = {
        message: null,
        data: null,
        statusCode: null
    };
    // Check if author exists
    let records = await db.all(`SELECT * FROM authors WHERE id = '${reqParaser.Body.author}'`);
    if (records.length === 0) {
        response.message = "author not exists";
        response.statusCode = 404;
        return res.status(404).json(response);
    }
    // Generate unique ID for this new book
    const id = createUniqueId();
    // Parsing body into SQL statement
    let statement = await db.prepare("INSERT INTO books(id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)");
    await statement.bind([id, reqParaser.Body.author, reqParaser.Body.title, reqParaser.Body.pubYear, reqParaser.Body.genre]);
    await statement.run();
    await statement.finalize();
    const newBook = {
        id,
        title: reqParaser.Body.title,
        pubYear: reqParaser.Body.pubYear,
        genre: reqParaser.Body.genre,
        author: reqParaser.Body.author
    };
    response = {
        message: "success",
        statusCode: 200,
        data: newBook
    };
    return res.status(200).json(response);
};
export default service;
