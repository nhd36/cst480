interface Body {
    title: string | null
    author_id: string | null
    genre: string | null
    pub_year: Number | null
    username: string
}

interface PathParam {
    bookId: string
}

export { PathParam, Body }