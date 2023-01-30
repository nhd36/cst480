import { Box, TableBody, TableRow, TableCell } from "@mui/material";
import CustomTable from "../../common/CustomTable";
import { BookType } from "../../common/type";

type BookTableProps = {
    data: Array<BookType>
}

const BookTable = ({ data }: BookTableProps) => {
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
                columns={["ID", "Title", "Genre", "Publish", "Author ID"]}
            >
                <TableBody>
                    {data.map((rowData, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {rowData.id}</TableCell>
                                <TableCell > {rowData.title} </TableCell>
                                <TableCell> {rowData.genre} </TableCell>
                                <TableCell> {rowData.pub_year} </TableCell>
                                <TableCell> {rowData.author_id} </TableCell>
                            </TableRow>
                        )

                    })}
                </TableBody>
            </CustomTable>
        </Box>
    )
}

export default BookTable;