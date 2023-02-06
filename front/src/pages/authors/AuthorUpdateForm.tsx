import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { AuthorBodyRequest, AuthorType, Status } from "../../common/type";
import { updateAuthor } from "../../actions/authors";

type TypeProps = {
    selectedData: AuthorType
    setStatus: Dispatch<SetStateAction<Status>>
    setReload: Dispatch<SetStateAction<boolean>>
    reload: boolean
}

const AuthorUpdateForm = ({ selectedData, setStatus, setReload, reload }: TypeProps) => {
    const [name, setName] = useState<String | null>(selectedData.name);
    const [bio, setBio] = useState<String | null>(selectedData.bio);
    useEffect(() => {
        setBio(selectedData.bio);
        setName(selectedData.name);
    }, [selectedData])

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleOnChangeBio = (event: ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    }

    const updateAuthorButton = () => {
        const bodyRequest: AuthorBodyRequest = {
            name,
            bio
        }
        updateAuthor(selectedData.id, bodyRequest, (message: string, statusCode: Number, error: any) => {
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
                {selectedData.id === null ? "No data is chosen for updating" : "Updating data for Author ID: " + selectedData.id }
            </Typography>
                    
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined" 
                    value={name}
                    disabled={selectedData.id === null}
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
                    value={bio}
                    disabled={selectedData.id === null}
                    onChange={handleOnChangeBio}
                />

                <Button
                    variant="contained"
                    onClick={updateAuthorButton}
                    disabled={selectedData.id === null}
                >
                    Update
                </Button>
        </Box>
    )
}

export default AuthorUpdateForm;