import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { listAuthors } from "../../actions/authors";
import Layout from "../../common/Layout";
import { AuthorType } from "../../common/type";
import AuthorForm from "./AuthorForm";
import AuthorTable from "./AuthorTable";


const Author = () => {
    const [authors, setAuthors] = useState<Array<AuthorType>>([]);
    const [reload, setReload] = useState<boolean>(true);
    useEffect(() => {
        listAuthors(null, (data: Array<AuthorType>, message: String, statusCode: Number) => {
            setAuthors(data);
            console.log(data);
        });
    }, [reload]);
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            height: "100%"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh"
            }}>
                <AuthorForm reload={reload} setData={setAuthors} setReload={setReload} />
            </Box>


            <Box sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100vh"
            }}>
                <AuthorTable data={authors} />
            </Box>

        </Box>
    )
}

export default Author;