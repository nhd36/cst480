const service = async (db, reqParser, res) => {
    let response = {
        message: null,
        data: null,
        statusCode: null
    };
    // Create update string
    let update = [];
    for (let key in reqParser.Body) {
        if (reqParser.Body[key] === null || reqParser.Body[key] === undefined) {
            continue;
        }
        update.push(`${key} = '${reqParser.Body[key]}'`);
    }
    if (update.length === 0) {
        response.message = "nothing to be updated";
        response.statusCode = 400;
        return res.status(400).json(response);
    }
    // Get Author ID
    const updateStr = update.join(",");
    // Parsing body into SQL statement
    let result = await db.run(`UPDATE authors SET ${updateStr} WHERE id = '${reqParser.PathParam.authorId}';`);
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
