import { createUniqueId } from "../../utility.js";
const service = async (db, reqParaser, res) => {
    // Generate unique ID for this new author
    const id = createUniqueId();
    // Parsing body into SQL statement
    let statement = await db.prepare("INSERT INTO authors(id, name, bio) VALUES (?, ?, ?)");
    await statement.bind([id, reqParaser.Body.name, reqParaser.Body.bio]);
    await statement.run();
    await statement.finalize();
    const newAuthor = {
        id,
        name: reqParaser.Body.name,
        bio: reqParaser.Body.bio
    };
    const response = {
        message: "success",
        statusCode: 200,
        data: newAuthor
    };
    return res.status(200).json(response);
};
export default service;
