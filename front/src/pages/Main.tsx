import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Author from "./authors/Author";
import Book from "./books/Book";
import StatusModal from "../common/StatusModal";
import { Status } from "../common/type";
import Authentication from "./user/Authentication";
import { authorizeUser } from "../actions/user";

const Main = () => {
    const [render, setRender] = useState<String>("authentication");
    const [status, setStatus] = useState<Status>({
        statusCode: null,
        message: null
    });
    const [username, setUsername] = useState<String | null>(null);
    useEffect(() => {
        authorizeUser((data: String | null, message: String | null, statusCode: Number | null, error: any) => {
            setUsername(data);
            if (statusCode !== 200) {
                if (statusCode === 401) {
                    setStatus({
                        statusCode: statusCode,
                        message: "Unauthorized. Please login"
                    })
                } else {
                    setStatus({
                        statusCode: statusCode,
                        message: message
                    })
                }
                setRender("authentication");
            } else {
                if (render === "authentication") {
                    setRender("authors")
                } else {
                    setRender(render);
                }
            }
        });
    }, [render]);
    return (
        <Layout username={username} setRender={setRender}>
            {render === "authentication" && <Authentication setRender={setRender} setStatus={setStatus} />}
            {render === "authors" && <Author setStatus={setStatus} username={username}/>}
            {render === "books" && <Book setStatus={setStatus} username={username}/>}
            <StatusModal status={status} setStatus={setStatus}/>
        </Layout>
    )
}

export default Main;