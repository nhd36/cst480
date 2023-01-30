import { useState } from "react";
import Layout from "../common/Layout";
import Author from "./authors/Author";
import Book from "./books/Book";

const Main = () => {
    const [render, setRender] = useState<String>("authors");
    return (
        <Layout setRender={setRender}>
            {render == "authors" && <Author />}
            {render == "books" && <Book />}
        </Layout>
    )
}

export default Main;