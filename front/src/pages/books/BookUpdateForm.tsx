import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { BookBodyRequest, BookType, Status } from "../../common/type";
import { updateBook } from "../../actions/books";

type TypeProps = {
    selectedData: BookType
    setStatus: Dispatch<SetStateAction<Status>>
    setReload: Dispatch<SetStateAction<boolean>>
    reload: boolean
}

const BookUpdateForm = ({ selectedData, setStatus, setReload, reload }: TypeProps) => {
    const [title, setTitle] = useState<String | null>(selectedData.title);
    const [genre, setGenre] = useState<String | null>(selectedData.genre);
    const [pubYear, setPubYear] = useState<String | null>(selectedData.pub_year);
    const [authorId, setAuthorId] = useState<String | null>(selectedData.author_id);

    useEffect(() => {
        setTitle(selectedData.title);
        setGenre(selectedData.genre);
        setAuthorId(selectedData.author_id);
        setPubYear(selectedData.pub_year);
    }, [selectedData])

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

    const updateBookButton = () => {
        const bodyRequest: BookBodyRequest = {
            title,
            genre,
            author: authorId,
            pub_year: pubYear
        }
        updateBook(selectedData.id, bodyRequest, (message: string, statusCode: Number, error: any) => {
            if (error !== null && error !== undefined) {
                setStatus({
                    message: error.message,
                    statusCode: error.statusCode
                });
            } else {
                setStatus({ message, statusCode });
            }
        })
        setReload(!reload);
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
            <Typography>
                {selectedData.id === null ? "No data is chosen for updating" : "Updating data for Book ID: " + selectedData.id }
            </Typography>
                    
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined" 
                    value={title}
                    disabled={selectedData.id === null}
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
                    value={genre}
                    disabled={selectedData.id === null}
                    onChange={handleOnChangeGenre}
                />
                <TextField
                    id="pub_year"
                    label="Publish Year"
                    variant="outlined"
                    sx={{
                        width: "100%"
                    }}
                    value={pubYear}
                    disabled={selectedData.id === null}
                    onChange={handleOnChangePubYear}
                />
                <TextField
                    id="author_id"
                    label="Author ID"
                    variant="outlined"
                    sx={{
                        width: "100%"
                    }}
                    value={authorId}
                    disabled={selectedData.id === null}
                    onChange={handleOnChangeAuthorId}
                />

                <Button
                    variant="contained"
                    onClick={updateBookButton}
                    disabled={selectedData.id === null}
                >
                    Update
                </Button>
        </Box>
    )
}

export default BookUpdateForm;