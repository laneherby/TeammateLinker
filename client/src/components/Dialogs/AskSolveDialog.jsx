import { useContext } from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button
} from '@mui/material';
import MainContext from "../../context/MainContext";

const PlayerAlreadySelectedDialog = ({ open }) => {
    const { states, changeGameStateCtx, setShowSolveDialog } = useContext(MainContext);

    return (
        <Dialog open={open}>
            <DialogTitle>
                Would you like the game solved for you?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The game will be solved showing the players that could have been selected to win the game.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => changeGameStateCtx(states.GAME_SOLVED)} variant="contained">
                    Yes
                </Button>
                <Button onClick={() => setShowSolveDialog(false)} variant="contained">
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlayerAlreadySelectedDialog;