import { Box, TextField, Button } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { listBooks } from "../../actions/books";
import { BookType, Status } from "../../common/type";

type BookSearchFormProps = {
    setStatus: Dispatch<SetStateAction<Status>>
    setData: Dispatch<SetStateAction<Array<BookType>>>
}

const BookSearchForm = ({ setStatus, setData }: BookSearchFormProps) => {
    const [title, setTitle] = useState<String | null>(null);
    const [from, setFrom] = useState<String | null>(null);
    const [to, setTo] = useState<String | null>(null);

    const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleOnChangeFrom = (event: ChangeEvent<HTMLInputElement>) => {
        setFrom(event.target.value);
    }

    const handleOnChangeTo = (event: ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value);
    }

    const searchClick = () => {
        console.log(title, from, to);
        listBooks(title, from, to, (data: Array<BookType>, message: String, statusCode: Number) => {
            setData(data);
            setStatus({ message, statusCode });
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "40%",
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
                id="from"
                label="Publish Year From"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeFrom}
            />
            <TextField
                id="to"
                label="Publish Year To"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeTo}
            />

            <Button
                variant="contained"
                onClick={searchClick}
            >
                Search
            </Button>
        </Box>
    )
}

export default BookSearchForm;