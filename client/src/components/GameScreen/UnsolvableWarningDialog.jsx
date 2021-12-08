import React from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button
} from '@mui/material';

const UnsolvableWarningDialog = ({ open, closeDialog, resetGame }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                {"Game may be unsolvable!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"It may be impossible to link these two players. However this check for linkable teammates is not perfect. If you think this pair of players is linkable and this dialog has shown, please tweet me about it "} <a className={"linkColor"} href="https://twitter.com/laneherby" target="_blank" rel="noreferrer">{"@laneherby"}</a>                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} variant="contained">
                    Try Anyways
                </Button>
                <Button onClick={() => resetGame("GAME_CHOICE")} variant="contained">
                    Create New Game
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnsolvableWarningDialog;