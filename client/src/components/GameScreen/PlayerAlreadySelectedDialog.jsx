import React from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button
} from '@mui/material';

const PlayerAlreadySelectedDialog = ({ open, player, closeDialog }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                {"Player currently is/was selected already!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`${player} is currently selected or is part of your selection history and cannot be selected again.`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} variant="contained">
                    OKAY
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlayerAlreadySelectedDialog;