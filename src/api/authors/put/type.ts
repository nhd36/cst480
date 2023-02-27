interface Body {
    name: string | null
    bio: string | null
    username: string
}

interface PathParam {
    authorId: string
}

export { PathParam, Body }