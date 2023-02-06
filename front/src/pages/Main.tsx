import { useState } from "react";
import Layout from "../common/Layout";
import Author from "./authors/Author";
import Book from "./books/Book";
import StatusModal from "../common/StatusModal";
import { Status } from "../common/type";

const Main = () => {
    const [render, setRender] = useState<String>("authors");
    const [status, setStatus] = useState<Status>({
        statusCode: null,
        message: null
    });
    return (
        <Layout setRender={setRender}>
            {render === "authors" && <Author setStatus={setStatus}/>}
            {render === "books" && <Book setStatus={setStatus}/>}
            <StatusModal status={status} setStatus={setStatus}/>
        </Layout>
    )
}

export default Main;