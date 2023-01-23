const service = async (db, reqParser, res) => {
    // Parsing body into SQL statement
    let result = await db.run(`DELETE FROM books WHERE id = '${reqParser.PathParam.bookId}';`);
    let response = {
        message: null,
        data: null,
        statusCode: null
    };
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
