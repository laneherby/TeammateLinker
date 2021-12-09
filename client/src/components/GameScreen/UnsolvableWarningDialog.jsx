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
                    {"It may be impossible to link these two players. However, this check will often show for players who debuted in the current year. So if one of the players debuted in the current year the game probably will be solvable."}
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