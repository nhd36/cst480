interface Author {
    id: string,
    name: string,
    bio: string
}

interface Book {
    id: string,
    title: string,
    pubYear: Number,
    genre: string,
    author: string
}

interface CustomResponse {
    message: string | null,
    data: any,
    statusCode: Number | null
}

interface RequestParser {
    Body: any,
    Header: any,
    PathParam: any,
    QueryParam: any,
    ExtraData: any,
}


export {
    Book,
    Author,
    CustomResponse,
    RequestParser
}
