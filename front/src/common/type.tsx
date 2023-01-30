type AuthorType = {
    id: string
    name: string | null
    bio: string | null
}

type BookType = {
    id: string
    title: string | null
    genre: string | null
    pub_year: string | null
    author_id: string | null
}


interface Status {
    message: String | null,
    statusCode: Number | null
}


interface BodyRequest {
}

interface AuthorBodyRequest extends BodyRequest {
    name: String | null
    bio: String | null
}

interface BookBodyRequest extends BodyRequest {
    title: String | null
    pub_year: String | null
    genre: String | null
    author: String | null
}


export type { AuthorType, BookType, Status, BookBodyRequest, AuthorBodyRequest }