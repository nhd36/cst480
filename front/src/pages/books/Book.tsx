import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { listBooks } from "../../actions/books";
import { BookType, Status } from "../../common/type";
import BookForm from "./BookForm";
import BookTable from "./BookTable";

type BookProps = {
    setStatus: Dispatch<SetStateAction<Status>>
    username: String | null
}

const Book = ({setStatus, username}: BookProps) => {
    const [authors, setBooks] = useState<Array<BookType>>([]);
    const [reload, setReload] = useState<boolean>(true);
    const [selected, setSelected] = useState<BookType>({
        id: null,
        title: null,
        genre: null,
        pub_year: null,
        author_id: null,
        username: null
    });

    useEffect(() => {
        listBooks(null, null, null, (data: Array<BookType>, message: String, statusCode: Number, error: null) => {
            if (error !== null) {
                console.log(error);
            } else {
                setBooks(data);
            }
        });
        setSelected({
            title: null,
            pub_year: null,
            author_id: null,
            genre: null,
            id: null,
            username: null
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
                <BookForm 
                    selectedData={selected} 
                    reload={reload} 
                    setData={setBooks} 
                    setReload={setReload} 
                    setStatus={setStatus}
                />
            </Box>


            <Box sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100vh"
            }}>
                <BookTable 
                    data={authors} 
                    setSelectedData={setSelected} 
                    selectedData={selected} 
                    reload={reload} 
                    setReload={setReload}
                    setStatus={setStatus}
                    username={username}
                />
            </Box>

        </Box>
    )
}

export default Book;