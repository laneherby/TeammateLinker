import React, { useState } from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button,
    TextField
} from '@mui/material';

const NewHighScore = ({ open }) => {
    const [validNickname, setValidNickname] = useState(true);

    const checkNameBeforeSubmit = () => {

    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                Enter your name for your new high score!
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You got a new high score in either time or number of moves.
                </DialogContentText>
                <TextField
                    error={validNickname}
                    autoFocus
                    margin="dense"
                    label="Nickname"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={checkNameBeforeSubmit} variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewHighScore;