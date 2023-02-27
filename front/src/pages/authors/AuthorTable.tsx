import { Box, TableBody, TableRow, TableCell, Checkbox, Button } from "@mui/material";
import CustomTable from "../../common/CustomTable";
import { AuthorType, Status } from "../../common/type";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { deleteAuthor } from "../../actions/authors";

type AuthorTableProps = {
    data: Array<AuthorType>
    setSelectedData: Dispatch<SetStateAction<AuthorType>>
    selectedData: AuthorType
    setReload: Dispatch<SetStateAction<boolean>>
    setStatus: Dispatch<SetStateAction<Status>>
    reload: boolean
    username: String | null
}

const AuthorTable = ({ data, selectedData, setSelectedData, setStatus, setReload, reload, username }: AuthorTableProps) => {
    const clickDeleteAuthor = (id: string | null) => {
        if (id === null) {
            setStatus({
                message: "Cannot delete ID null",
                statusCode: 400
            })
        }
        deleteAuthor(id,  (message: string, statusCode: Number, error: any) => {
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
                width: "50vw",
                height: "100%",
                margin: "20px"
            }}
        >
            <CustomTable
                columns={["", "ID", "Name", "Bio", "Created By", ""]}
            >
                <TableBody>
                    {data.map((rowData, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Checkbox 
                                        checked={selectedData.id === rowData.id} 
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            if (event.target.checked) {
                                                setSelectedData(rowData);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row"> {rowData.id}</TableCell>
                                <TableCell sx={{wordBreak: "break-all"}}>{rowData.name}</TableCell>
                                <TableCell sx={{wordBreak: "break-all"}}> {rowData.bio} </TableCell>
                                <TableCell sx={{wordBreak: "break-all"}}> {rowData.username} </TableCell>
                                <TableCell> 
                                    {username === rowData.username && <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {clickDeleteAuthor(rowData.id)}}
                                    >
                                        Delete
                                    </Button>}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </CustomTable>
        </Box>
    )
}

export default AuthorTable;