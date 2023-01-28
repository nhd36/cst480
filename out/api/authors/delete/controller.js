import service from "./service.js";
const controller = async (db, req, res) => {
    const pathParam = {
        authorId: req.params.authorId
    };
    const reqParser = {
        PathParam: pathParam,
        Body: null,
        QueryParam: null,
        Header: null,
        ExtraData: null
    };
    return service(db, reqParser, res);
};
export default controller;
