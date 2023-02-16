import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Status } from "../../common/type";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthenticationProps = {
    setStatus: Dispatch<SetStateAction<Status>>
    setRender: Dispatch<SetStateAction<String>>
}

const Authentication = ({setStatus, setRender} : AuthenticationProps) => {
    
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            height: "90vh"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "50%",
                height: "100%",
                borderLeft: "solid"
            }}>
                <LoginForm setRender={setRender} setStatus={setStatus}/>
            </Box>


            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "50%",
                height: "100%",
                borderLeft: "solid"
            }}>
                <RegisterForm setStatus={setStatus}/>
            </Box>
        </Box>

    )
}

export default Authentication;