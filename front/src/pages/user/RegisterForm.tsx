import { Box, TextField, Button, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { RegisterBodyRequest, Status } from "../../common/type";
import { registerUser } from "../../actions/user";

type RegisterFormProps = {
    setStatus: Dispatch<SetStateAction<Status>>
}

const RegisterForm = ({ setStatus }: RegisterFormProps) => {
    const [username, setUsername] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<String | null>(null);

    const handleOnChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleOnChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const registerButton = () => {
        if (confirmPassword !== password) {
            setStatus({
                message: "Password not match",
                statusCode: 400
            });
        } else {
            const bodyRequest: RegisterBodyRequest = {
                username: username,
                password: password
            }
            registerUser(bodyRequest, (message: String | null, statusCode: Number | null, error: any) => {
                if (error !== null && error !== undefined) {
                    setStatus({
                        message: error.message,
                        statusCode: error.statusCode
                    });
                } else {
                    setStatus({ message, statusCode });
                }
            });
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "50%",
                width: "50%",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            component="form"
            noValidate
            autoComplete="off">
            <Typography fontSize={40}>
                Register
            </Typography>
            <TextField
                id="register-username"
                label="Username"
                variant="outlined"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeUsername}
            />
            <TextField
                id="register-password"
                label="Password"
                variant="outlined"
                type="password"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangePassword}
            />
            <TextField
                id="register-confirm-password"
                label="Confirm Password"
                variant="outlined"
                type="password"
                sx={{
                    width: "100%"
                }}
                onChange={handleOnChangeConfirmPassword}
            />
            <Button
                sx={{
                    width: "100%"
                }}
                variant="contained"
                onClick={registerButton}
            >
                Register
            </Button>
        </Box>
    )
}

export default RegisterForm;