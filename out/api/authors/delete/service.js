const service = async (db, reqParser, res) => {
    let response = {
        message: null,
        data: null,
        statusCode: null
    };
    // Check if author associates with any existing book
    let books = await db.all(`SELECT id FROM books WHERE author_id = '${reqParser.PathParam.authorId}';`);
    if (books.length > 0) {
        response.message = "cannot delete this author; author associates with existing books";
        response.statusCode = 400;
        return res.status(400).json(response);
    }
    // Parsing body into SQL statement
    let result = await db.run(`DELETE FROM authors WHERE id = '${reqParser.PathParam.authorId}';`);
    // Check if ID exists
    if (result.changes === 0) {
        response.message = "data not exists";
        response.statusCode = 404;
        return res.status(404).json(response);
    }
    response.message = "success";
    response.statusCode = 200;
    return res.status(200).json(response);
};
export default service;
