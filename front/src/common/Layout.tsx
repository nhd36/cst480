import { Box } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import NavBar from "./NavBar";


type LayoutProps = {
    children: ReactNode
    setRender: Dispatch<SetStateAction<String>>
    username: String | null
}

const Layout = ({ children, setRender, username }: LayoutProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                height: "100%"
            }}
        >
            <NavBar username={username} setRender={setRender} />
            <br/>
            {children}
        </Box>
    )
}

export default Layout;