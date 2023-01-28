import { verifyNonNull } from "../../utility.js";
import service from "./service.js";
const controller = async (db, req, res) => {
    var _a, _b, _c, _d;
    // Parsing body message
    const body = {
        title: (_a = req.body) === null || _a === void 0 ? void 0 : _a.title,
        genre: (_b = req.body) === null || _b === void 0 ? void 0 : _b.genre,
        pubYear: Number.parseInt((_c = req.body) === null || _c === void 0 ? void 0 : _c.pub_year) || null,
        author: (_d = req.body) === null || _d === void 0 ? void 0 : _d.author
    };
    if (!verifyNonNull(["title", "genre", "pubYear", "author"], body)) {
        let response = {
            message: "one of the field is null",
            data: null,
            statusCode: 400
        };
        return res.status(400).json(response);
    }
    // Aggregate into Request Parser
    const reqParser = {
        Body: body,
        Header: null,
        PathParam: null,
        QueryParam: null,
        ExtraData: null
    };
    return service(db, reqParser, res);
};
export default controller;
