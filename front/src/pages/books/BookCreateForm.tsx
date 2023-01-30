import { Box, TextField, Button } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { createBook } from "../../actions/books";
import { BookBodyRequest, Status } from "../../common/type";

type BookCreateFormProps = {
    reload: boolean
    setStatus: Dispatch<SetStateAction<Status>>
    setReload: Dispatch<SetStateAction<boolean>>
}

const BookCreateForm = ({ reload, setStatus, setReload }: BookCreateFormProps) => {
    const [title, setTitle] = useState<String | null>(null);
    const [genre, setGenre] = useState<String | null>(null);
    const [pubYear, setPubYear] = useState<String | null>(null);
    const [authorId, setAuthorId] = useState<String | null>(null);

    const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleOnChangeGenre = (event: ChangeEvent<HTMLInputElement>) => {
        setGenre(event.target.value);
    }

    const handleOnChangePubYear = (event: ChangeEvent<HTMLInputElement>) => {
        setPubYear(event.target.value);
    }

    const handleOnChangeAuthorId = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthorId(event.target.value);
    }

    const createBookButton = () => {
        const bodyRequest: BookBodyRequest = {
            title,
            genre,
            author: authorId,
            pub_year: pubYear
        }
        console.log(bodyRequest);
        createBook(bodyRequest, (message: String, statusCode: Number, error: any) => {
            if (error !== null && error !== undefined) {
                setStatus({
                    message: error.message,
                    statusCode: error.statusCode
                });
            } else {
                setStatus({ message, statusCode });
                setReload(!reload);
            }
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "50%",
                justifyContent: "space-between"
            }}
            component="form"
            noValidate
            autoComplete="off">
            <TextField
                id="title"
                label="Title"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeTitle}
            />
            <TextField
                id="genre"
                label="Genre"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeGenre}
            />
            <TextField
                id="pub_year"
                label="Publish Year"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangePubYear}
            />
            <TextField
                id="author_id"
                label="Author ID"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeAuthorId}
            />

            <Button
                variant="contained"
                onClick={createBookButton}
            >
                Create
            </Button>
        </Box>
    )
}

export default BookCreateForm;

// return (
//     <Box
//         sx={{
//             display: "flex",
//             flexDirection: "column",
//             height: "50%",
//             justifyContent: "space-between"
//         }}
//         component="form"
//         noValidate
//         autoComplete="off">
//         <TextField
//             id="title"
//             label="Title"
//             variant="outlined"
//             sx={{
//                 width: "100%"
//             }}
//         />
//         <TextField
//             id="genre"
//             label="Genre"
//             variant="outlined"
//             sx={{
//                 width: "100%"
//             }}
//         />
//         <TextField
//             id="pub_year"
//             label="Publish Year"
//             variant="outlined"
//             sx={{
//                 width: "100%"
//             }}
//         />
//         <TextField
//             id="author_id"
//             label="Book ID"
//             variant="outlined"
//             sx={{
//                 width: "100%"
//             }}
//         />

//         <Button variant="contained">Create</Button>
//     </Box>
// )