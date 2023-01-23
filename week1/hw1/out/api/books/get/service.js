const service = async (db, reqParser, res) => {
    // Writing callback function for SQL statement.
    const callbackFunc = (err, row) => {
        let response = {
            message: null,
            data: null,
            statusCode: null
        };
        if (err !== null) {
            response.message = err.message;
            response.statusCode = 500;
            return res.status(500).json(response);
        }
        else if (row === undefined) {
            response.message = "data not exists";
            response.statusCode = 404;
            return res.status(404).json(response);
        }
        const author = {
            id: row.id,
            title: row.title,
            pubYear: row.pub_year,
            genre: row.genre,
            author: row.author_id
        };
        response = {
            message: "success",
            data: author,
            statusCode: 200
        };
        return res.status(200).json(response);
    };
    // Make SQL query statement
    var statement = await db.prepare(`SELECT * FROM books WHERE id = '${reqParser.PathParam.bookId}';`);
    statement.stmt.get(callbackFunc);
    statement.finalize();
};
export default service;
