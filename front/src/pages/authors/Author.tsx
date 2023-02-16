import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { listAuthors } from "../../actions/authors";
import { AuthorType, Status } from "../../common/type";
import AuthorForm from "./AuthorForm";
import AuthorTable from "./AuthorTable";

type AuthorProps = {
    setStatus: Dispatch<SetStateAction<Status>>
}

const Author = ({setStatus}: AuthorProps) => {
    const [authors, setAuthors] = useState<Array<AuthorType>>([]);
    const [reload, setReload] = useState<boolean>(true);
    const [selected, setSelected] = useState<AuthorType>({
        id: null,
        bio: null,
        name: null
    });
    useEffect(() => {
        listAuthors(null, (data: Array<AuthorType>, message: String, statusCode: Number, error: any) => {
            if (error !== null) {
                console.log(error);
            } else {
                setAuthors(data);
                console.log(data);
            }
        });
    }, [reload]);
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            height: "100%"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh"
            }}>
                <AuthorForm 
                    reload={reload} 
                    setData={setAuthors} 
                    setReload={setReload} 
                    selectedData={selected}
                    setSelectedData={setSelected}
                    setStatus={setStatus}
                />
            </Box>


            <Box sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100vh"
            }}>
                <AuthorTable 
                    data={authors} 
                    selectedData={selected}
                    setSelectedData={setSelected}
                    setStatus={setStatus}
                    setReload={setReload}
                    reload={reload}
                />
            </Box>

        </Box>
    )
}

export default Author;