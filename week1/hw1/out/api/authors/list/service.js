const service = async (db, reqParser, res) => {
    // Make query to the datbase
    let queryStatement = "SELECT * FROM authors";
    if (reqParser.QueryParam.name) {
        queryStatement = `${queryStatement} WHERE name LIKE '%${reqParser.QueryParam.name}%'`;
    }
    const authors = await db.all(`${queryStatement};`);
    // Make response object
    const response = {
        data: authors,
        message: "success",
        statusCode: 200
    };
    return res.status(200).json(response);
};
export default service;
