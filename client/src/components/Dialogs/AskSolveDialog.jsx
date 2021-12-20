import React from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button
} from '@mui/material';

const PlayerAlreadySelectedDialog = ({ open, solveGame, closeSolveDialog }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                {"Would you like the game solved for you?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"The game will be solved showing the players that could have been selected to win the game."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => solveGame("GAME_SOLVED")} variant="contained">
                    Yes
                </Button>
                <Button onClick={closeSolveDialog} variant="contained">
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlayerAlreadySelectedDialog;