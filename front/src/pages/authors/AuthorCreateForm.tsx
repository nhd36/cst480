import { Box, TextField, Button } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { createAuthor } from "../../actions/authors";
import { AuthorBodyRequest, Status } from "../../common/type";

type AuthorCreateFormProps = {
    reload: boolean
    setStatus: Dispatch<SetStateAction<Status>>
    setReload: Dispatch<SetStateAction<boolean>>
}

const AuthorCreateForm = ({ reload, setStatus, setReload }: AuthorCreateFormProps) => {
    const [name, setName] = useState<String | null>(null);
    const [bio, setBio] = useState<String | null>(null);

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleOnChangeBio = (event: ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    }

    const createAuthorButton = () => {
        const bodyRequest: AuthorBodyRequest = {
            name: name,
            bio: bio
        }
        createAuthor(bodyRequest, (message: String, statusCode: Number, error: any) => {
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
            <TextField
                id="bio"
                label="Bio"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                multiline
                onChange={handleOnChangeBio}
            />

            <Button
                variant="contained"
                onClick={createAuthorButton}
            >
                Create
            </Button>
        </Box>
    )
}

export default AuthorCreateForm;