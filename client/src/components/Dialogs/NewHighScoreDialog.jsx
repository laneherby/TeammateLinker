import React, { useState, useEffect } from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button,
    TextField
} from '@mui/material';

const NewHighScoreDialog = ({ open, newMovesScore, newTimeScore, updateNameAndClose }) => {
    const [nickname, setNickname] = useState("");
    const [dialogText, setDialogText] = useState("");

    useEffect(() => {
        console.log(newMovesScore, newTimeScore);
        let newDialogText = "New high score in: ";

        if(newMovesScore === true && newTimeScore === false) {
            newDialogText += "number of moves."
        }
        else if (newMovesScore === false && newTimeScore === true) {
            newDialogText += "shortest time."
        }
        else {
            newDialogText += "number of moves and shortest time."
        }

        setDialogText(newDialogText);        
    }, [newMovesScore, newTimeScore]);

    const handleNameChange = (e) => {
        setNickname(e.target.value);
    };

    const submitName = () => {
        updateNameAndClose(nickname);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>
                Enter your name for your new high score!
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
                <TextField                    
                    autoFocus
                    margin="dense"
                    label="Nickname"
                    fullWidth
                    variant="standard"
                    value={nickname}
                    onChange={handleNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={submitName} 
                    variant="contained"
                    disabled={nickname.length < 1}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewHighScoreDialog;