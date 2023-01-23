import service from "./service.js";
const controller = async (db, req, res) => {
    const pathParam = {
        authorId: req.params.authorId
    };
    const body = {
        name: req.body.name || null,
        bio: req.body.bio || null
    };
    const reqParser = {
        Body: body,
        PathParam: pathParam,
        Header: null,
        QueryParam: null,
        ExtraData: null
    };
    return service(db, reqParser, res);
};
export default controller;
