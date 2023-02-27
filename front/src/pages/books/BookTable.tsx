import { Box, TableBody, TableRow, TableCell, Checkbox, Button } from "@mui/material";
import CustomTable from "../../common/CustomTable";
import { BookType, Status } from "../../common/type";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { deleteBook } from "../../actions/books";

type BookTableProps = {
    data: Array<BookType>,
    selectedData: BookType,
    setSelectedData: Dispatch<SetStateAction<BookType>>
    setStatus: Dispatch<SetStateAction<Status>>
    setReload: Dispatch<SetStateAction<boolean>>
    reload: boolean,
    username: String | null
}

const BookTable = ({ data, selectedData, setSelectedData, setStatus, setReload, reload, username }: BookTableProps) => {

    const clickDeleteBook = (id: string | null) => {
        if (id === null) {
            setStatus({
                message: "Cannot delete ID null",
                statusCode: 400
            })
        }
        deleteBook(id, (message: String, statusCode: Number, error: any) => {
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
                columns={["", "ID", "Title", "Genre", "Publish", "Author ID", "Created By", ""]}
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
                                <TableCell> {rowData.title} </TableCell>
                                <TableCell> {rowData.genre} </TableCell>
                                <TableCell> {rowData.pub_year} </TableCell>
                                <TableCell> {rowData.author_id} </TableCell>
                                <TableCell> {rowData.username} </TableCell>
                                <TableCell> 
                                    {username === rowData.username && <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {clickDeleteBook(rowData.id)}}
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

export default BookTable;