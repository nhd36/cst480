import service from "./service.js";
const controller = async (db, req, res) => {
    const pathParam = {
        bookId: req.params.bookId
    };
    const body = {
        title: req.body.title || null,
        genre: req.body.genre || null,
        author_id: req.body.author || null,
        pub_year: Number.parseInt(req.body.pub_year) || null
    };
    const reqParser = {
        Body: body,
        PathParam: pathParam,
        Header: null,
        QueryParam: null,
        ExtraData: null
    };
    console.log(body);
    return service(db, reqParser, res);
};
export default controller;
