import { TableContainer, Paper, Table, TableHead, TableCell } from "@mui/material";
import { ReactElement } from "react";

type CustomTableProps = {
    columns: Array<String>
    children: ReactElement
}

const CustomTable = ({ columns, children }: CustomTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 60 }}
                aria-label="custom-table"
            >
                <TableHead>
                    {columns.map((name, index) => {
                        return (
                            <TableCell id={`${index}`} key={index}>{name}</TableCell>
                        );
                    })}
                </TableHead>
                {children}
            </Table>
        </TableContainer>
    )
}

export default CustomTable;