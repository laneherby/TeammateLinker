import { useContext, useEffect, useState } from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button
} from '@mui/material';
import MainContext from "../../context/MainContext";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const PlayerAlreadySelectedDialog = ({ open }) => {
    const { states, changeGameStateCtx, setShowSolveDialog, startPlayer, endPlayer } = useContext(MainContext);
    const [fetchURL, setFetchURL] = useState("");
    const { data } = useAxiosFetch(fetchURL, "GET");

    useEffect(() => {
        if(data && data.length > 0) {
            console.log(data);            
        }
    }, [data])

    const handleYesClicked = () => {
        setFetchURL(`/api/solve?startPlayer=${startPlayer._id.substring(startPlayer._id.lastIndexOf("/")+1, startPlayer._id.lastIndexOf("."))}&endPlayer=${endPlayer._id.substring(endPlayer._id.lastIndexOf("/")+1, endPlayer._id.lastIndexOf("."))}`);
    }

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
                <Button onClick={() => handleYesClicked()} variant="contained">
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