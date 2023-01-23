import service from "./service.js";
const controller = async (db, req, res) => {
    const pathParam = {
        bookId: req.params.bookId
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