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
    const { errorPlayerName, setshowAlreadySelectedDialog } = useContext(MainContext);

    return (
        <Dialog open={open}>
            <DialogTitle>
                {"Player currently is/was selected already!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`${errorPlayerName} is currently selected or is part of your selection history and cannot be selected again.`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setshowAlreadySelectedDialog(false)} variant="contained">
                    OKAY
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlayerAlreadySelectedDialog;