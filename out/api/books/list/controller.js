import listService from "./service.js";
const controller = async (db, req, res) => {
    var _a, _b, _c;
    // Parse query param from request
    const queryParam = {
        title: ((_a = req.query) === null || _a === void 0 ? void 0 : _a.title) || null,
        from: Number.parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.from) || null,
        to: Number.parseInt((_c = req.query) === null || _c === void 0 ? void 0 : _c.to) || null
    };
    // Aggregate into Request Parser
    const reqParser = {
        QueryParam: queryParam,
        Body: null,
        Header: null,
        PathParam: null,
        ExtraData: null
    };
    return listService(db, reqParser, res);
};
export default controller;
