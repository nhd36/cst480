import { verifyNonNull } from "../../utility.js";
import service from "./service.js";
const controller = async (db, req, res) => {
    var _a, _b;
    // Parsing body message
    const body = {
        name: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) || null,
        bio: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.bio) || null
    };
    if (!verifyNonNull(["name", "bio"], body)) {
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
