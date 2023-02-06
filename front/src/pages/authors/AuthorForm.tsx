import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { AuthorType, Status } from "../../common/type";
import AuthorCreateForm from "./AuthorCreateForm";
import AuthorSearchForm from "./AuthorSearchForm";
import AuthorUpdateForm from "./AuthorUpdateForm";

type AuthorProps = {
    reload: boolean
    setData: Dispatch<SetStateAction<Array<AuthorType>>>
    setReload: Dispatch<SetStateAction<boolean>>
    setStatus: Dispatch<SetStateAction<Status>>
    setSelectedData: Dispatch<SetStateAction<AuthorType>>
    selectedData: AuthorType
}

const AuthorForm = ({ reload, setData, setReload, setStatus, selectedData, setSelectedData }: AuthorProps) => {
    const [form, setForm] = useState<Number>(1);
    const activeBtnColor = "warning";
    const inActiveBtnColor = "primary";


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
                Authors
            </Typography>
            <ButtonGroup
                variant="text"
                aria-label="Button Group for Authors action"
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
            {form === 1 && <AuthorCreateForm reload={reload} setReload={setReload} setStatus={setStatus} />}
            {form === 2 && <AuthorSearchForm setData={setData} setStatus={setStatus} />}
            {form === 3 && <AuthorUpdateForm setStatus={setStatus} selectedData={selectedData} setReload={setReload} reload={reload} />}
        </Box>
    );
}

export default AuthorForm;