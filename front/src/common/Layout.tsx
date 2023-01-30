import { Box } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import NavBar from "./NavBar";


type LayoutProps = {
    children: ReactNode
    setRender: Dispatch<SetStateAction<String>>
}

const Layout = ({ children, setRender }: LayoutProps) => {
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
            <NavBar setRender={setRender} />
            {children}
        </Box>
    )
}

export default Layout;