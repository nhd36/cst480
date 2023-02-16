import { Box, TextField, Button, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { LoginBodyRequest, Status } from "../../common/type";
import { loginUser } from "../../actions/user";

type LoginFormProps = {
    setStatus: Dispatch<SetStateAction<Status>>
    setRender: Dispatch<SetStateAction<String>>
}

const LoginForm = ({ setStatus, setRender }: LoginFormProps) => {
    const [username, setUsername] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);

    const handleOnChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const loginButton = () => {
        const bodyRequest: LoginBodyRequest = {
            username: username,
            password: password
        }
        loginUser(bodyRequest, (message: String | null, statusCode: Number | null, error: any) => {
            if (error !== null && error !== undefined) {
                setStatus({
                    message: error.message,
                    statusCode: error.statusCode
                });
            } else {
                setStatus({ message, statusCode });
                setRender("authors");
            }
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "40%",
                width: "50%",
                justifyContent: "space-between",
                alignItems: "center"
            }}
            component="form"
            noValidate
            autoComplete="off">
            <Typography fontSize={40}>
                Login
            </Typography>
            <TextField
                id="username"
                label="Username"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeUsername}
            />
            <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangePassword}
            />

            <Button
                sx={{
                    width: "100%"
                }}
                variant="contained"
                onClick={loginButton}
            >
                Login
            </Button>
        </Box>
    )
}

export default LoginForm;