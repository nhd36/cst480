import listService from "./service.js";
const controller = async (db, req, res) => {
    var _a;
    // Parse query param from request
    const queryParam = {
        name: ((_a = req.query) === null || _a === void 0 ? void 0 : _a.name) || null
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
