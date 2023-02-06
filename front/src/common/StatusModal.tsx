import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Alert } from "@mui/material"
import { Status } from "./type"
import { Dispatch, SetStateAction } from "react"

type StatusModalProps = {
    status: Status,
    setStatus: Dispatch<SetStateAction<Status>>
}

const StatusModal = ({status, setStatus}: StatusModalProps) => {

    const handleClose = () => {
        setStatus({
            message: null,
            statusCode: null
        })
    }
    return (
        <Dialog
            open={status.statusCode !== null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Request Status"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Alert sx={{ alignItems: "center" }} severity={status.statusCode === 200 ? "success" : "error"}>{status.message}</Alert>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default StatusModal;