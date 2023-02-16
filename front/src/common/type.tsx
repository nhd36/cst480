type AuthorType = {
    id: string | null
    name: string | null
    bio: string | null
}

type BookType = {
    id: string | null
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

interface LoginBodyRequest extends BodyRequest {
    username: String | null,
    password: String | null
}

interface RegisterBodyRequest extends BodyRequest {
    username: String | null,
    password: String | null
}

export type { AuthorType, BookType, Status, BookBodyRequest, AuthorBodyRequest, LoginBodyRequest, RegisterBodyRequest }