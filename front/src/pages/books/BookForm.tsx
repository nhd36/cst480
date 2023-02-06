import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { BookType, Status } from "../../common/type";
import BookCreateForm from "./BookCreateForm";
import BookSearchForm from "./BookSearchForm";
import BookUpdateForm from "./BookUpdateForm";

type BookProps = {
    reload: boolean
    setData: Dispatch<SetStateAction<Array<BookType>>>
    setReload: Dispatch<SetStateAction<boolean>>
    selectedData:BookType
    setStatus: Dispatch<SetStateAction<Status>>
}

const BookForm = ({ reload, setData, setReload, selectedData, setStatus }: BookProps) => {
    const [form, setForm] = useState<Number>(1);
    const activeBtnColor = "warning";
    const inActiveBtnColor = "primary";

    return (
        <Box
            sx={{
                width: "50%",
                height: "95%",
                textAlign: "center"
            }}
        >
            <Typography
                sx={{
                    fontSize: 50
                }}
            >
                Books
            </Typography>
            <ButtonGroup
                variant="text"
                aria-label="Button Group for Books action"
                sx={{
                    marginBottom: "20px"
                }}
            >
                <Button
                    color={form === 1 ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setForm(1) }}
                >
                    Create
                </Button>
                <Button
                    color={form === 2 ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setForm(2) }}
                >
                    Search
                </Button>
                <Button
                    color={form === 3 ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setForm(3) }}
                >
                    Update
                </Button>
            </ButtonGroup>
            {form === 1 && <BookCreateForm reload={reload} setReload={setReload} setStatus={setStatus} />}
            {form === 2 && <BookSearchForm setData={setData} setStatus={setStatus} />}
            {form === 3 && <BookUpdateForm setStatus={setStatus} selectedData={selectedData} setReload={setReload} reload={reload}/>}
        </Box>
    );
}

export default BookForm;