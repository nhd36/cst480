import { Box, Typography, ButtonGroup, Button, Alert } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { BookType, Status } from "../../common/type";
import BookCreateForm from "./BookCreateForm";
import BookSearchForm from "./BookSearchForm";

type BookProps = {
    reload: boolean
    setData: Dispatch<SetStateAction<Array<BookType>>>
    setReload: Dispatch<SetStateAction<boolean>>
}

const BookForm = ({ reload, setData, setReload }: BookProps) => {
    const [createForm, setCreateForm] = useState(true);
    const [status, setStatus] = useState<Status>({
        statusCode: null,
        message: null
    });
    const activeBtnColor = "warning";
    const inActiveBtnColor = "primary";


    const setActiveBtn = (value: boolean) => {
        setCreateForm(value);
    }

    return (
        <Box
            sx={{
                width: "50%",
                height: "80%",
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
                    color={!createForm ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setActiveBtn(false) }}
                >
                    Search
                </Button>
                <Button
                    color={createForm ? activeBtnColor : inActiveBtnColor}
                    onClick={() => { setActiveBtn(true) }}
                >
                    Create
                </Button>
            </ButtonGroup>
            {createForm && <BookCreateForm reload={reload} setReload={setReload} setStatus={setStatus} />}
            {!createForm && <BookSearchForm setData={setData} setStatus={setStatus} />}
            {status.statusCode !== null && <Alert sx={{ alignItems: "center" }} severity={status.statusCode === 200 ? "success" : "error"}>{status.message}</Alert>}
        </Box>
    );
}

export default BookForm;