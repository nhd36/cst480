import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { listBooks } from "../../actions/books";
import Layout from "../../common/Layout";
import { BookType } from "../../common/type";
import BookForm from "./BookForm";
import BookTable from "./BookTable";


const Book = () => {
    const [authors, setBooks] = useState<Array<BookType>>([]);
    const [reload, setReload] = useState<boolean>(true);
    useEffect(() => {
        listBooks(null, null, null, (data: Array<BookType>, message: String, statusCode: Number) => {
            setBooks(data);
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
                <BookForm reload={reload} setData={setBooks} setReload={setReload} />
            </Box>


            <Box sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100vh"
            }}>
                <BookTable data={authors} />
            </Box>

        </Box>
    )
}

export default Book;