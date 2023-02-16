import { Box, TextField, Button } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { listAuthors } from "../../actions/authors";
import { AuthorType, Status } from "../../common/type";

type AuthorSearchFormProps = {
    setStatus: Dispatch<SetStateAction<Status>>
    setData: Dispatch<SetStateAction<Array<AuthorType>>>
}

const AuthorSearchForm = ({ setStatus, setData }: AuthorSearchFormProps) => {
    const [name, setName] = useState<String | null>(null);

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const searchClick = () => {
        listAuthors(name, (data: Array<AuthorType>, message: String, statusCode: Number, error: any) => {
            if (error !== null) {
                console.log(error);
            } else {
                setData(data);
                setStatus({ message, statusCode });
            }
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
                id="name"
                label="Name"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeName}
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

export default AuthorSearchForm;