import { Box, TableBody, TableRow, TableCell } from "@mui/material";
import CustomTable from "../../common/CustomTable";
import { AuthorType } from "../../common/type";

type AuthorTableProps = {
    data: Array<AuthorType>
}

const AuthorTable = ({ data }: AuthorTableProps) => {
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
                columns={["ID", "Name", "Bio"]}
            >
                <TableBody>
                    {data.map((rowData, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {rowData.id}</TableCell>
                                <TableCell sx={{
                                    minWidth: "5vw",
                                    wordBreak: "break-all"
                                }}
                                >
                                    {rowData.name}
                                </TableCell>
                                <TableCell sx={{
                                    minWidth: "30vw",
                                    wordBreak: "break-all"
                                }}>
                                    {rowData.bio}

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