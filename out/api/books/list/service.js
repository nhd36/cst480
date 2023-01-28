const service = async (db, reqParser, res) => {
    let conditions = [];
    // Make query to the datbase
    if (reqParser.QueryParam.title) {
        conditions.push(`title LIKE '%${reqParser.QueryParam.title}%'`);
    }
    if (reqParser.QueryParam.from) {
        conditions.push(`pub_year >= ${reqParser.QueryParam.from}`);
    }
    if (reqParser.QueryParam.to) {
        conditions.push(`pub_year <= ${reqParser.QueryParam.to}`);
    }
    let queryStatement = "SELECT * FROM books";
    if (conditions.length > 0) {
        const conditionStr = conditions.join(" AND ");
        queryStatement = `${queryStatement} WHERE ${conditionStr}`;
    }
    const books = await db.all(`${queryStatement};`);
    // Make response object
    const response = {
        data: books,
        message: "success",
        statusCode: 200
    };
    return res.status(200).json(response);
};
export default service;
