CREATE TABLE books (
    -- unique book id, can change to be integer if you want
    id TEXT PRIMARY KEY,
    author_id TEXT, -- should equal an author id in authors table
    title TEXT,     -- book title
    pub_year TEXT,  -- 4 digit string publishing year, e.g. "1867"
    genre TEXT,     -- book genre (adventure, sci-fi, etc.)
    -- enforces that author_id maps to valid id in authors table
    FOREIGN KEY(author_id) REFERENCES authors(id)
);
CREATE TABLE authors (
    -- unique author id, can change to be integer if you want
    id TEXT PRIMARY KEY,
    name TEXT, -- author name
    bio TEXT   -- short author biography
);