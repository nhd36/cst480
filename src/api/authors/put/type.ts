interface Body {
    name: string | null
    bio: string | null
}

interface PathParam {
    authorId: string
}

export { PathParam, Body }