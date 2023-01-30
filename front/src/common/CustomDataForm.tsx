import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

const CustomDataForm = () => {
    const [createForm, setCreateForm] = useState(true);
    const activeBtnColor = "warning";
    const inActiveBtnColor = "primary";
    const setActiveBtn = (value: boolean) => {
        setCreateForm(value);
    }
    return (
        <Box
            sx={{
                width: "50%",
                height: "80%",
                textAlign: "center"
            }}
        >
            <Typography
                sx={{
                    fontSize: 50
                }}
            >
                Authors
            </Typography>
            <ButtonGroup
                variant="text"
                aria-label="Button Group for Authors action"
                sx={{
                    marginBottom: "20px"
                }}
            >
                <Button
                    color={createForm ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setActiveBtn(true) }}
                >
                    Seach
                </Button>
                <Button
                    color={!createForm ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setActiveBtn(false) }}
                >
                    Create
                </Button>
            </ButtonGroup>
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
                />
                <TextField
                    id="bio"
                    label="Bio"
                    variant="outlined"
                    sx={{
                        width: "100%"
                    }}
                    multiline
                />

                <Button variant="contained">Submit</Button>
            </Box>
        </Box>
    );
}

export default CustomDataForm;