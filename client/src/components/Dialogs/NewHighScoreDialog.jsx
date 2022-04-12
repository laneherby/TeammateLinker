import { useState, useEffect, useContext } from "react";
import { 
    Dialog, 
    DialogActions, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    Button,
    TextField,
    CircularProgress
} from '@mui/material';
import MainContext from '../../context/MainContext';
import useAxiosFetch from '../../hooks/useAxiosFetch';

const NewHighScoreDialog = ({ open, newMovesScore, newTimeScore, close }) => {
    const {
        startPlayer, endPlayer, time, numMoves, convertStopwatchToSeconds
    } = useContext(MainContext);

    const [nickname, setNickname] = useState("");
    const [dialogText, setDialogText] = useState("");
    const [buttonText, setButtonText] = useState("Submit");
    const [fetchURL, setFetchURL] = useState("");
    const [postBody, setPostBody] = useState(null);
    const { data } = useAxiosFetch(fetchURL, "POST", postBody);

    useEffect(() => {
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
    
    useEffect(() => {
        if(postBody !== null) {
            console.log(postBody);
            setFetchURL(`/api/updatescore`);
        }
    }, [postBody]);

    useEffect(() => {
        close(nickname)
    }, [data]);

    const handleNameChange = (e) => {
        setNickname(e.target.value);
    };

    const submitName = () => {
        const scoreData = {            
            players: [startPlayer._id, endPlayer._id],
            ...(newTimeScore && {seconds: convertStopwatchToSeconds(time)}),
            ...(newMovesScore && {moves: numMoves}),
            ...(newTimeScore && {timeLeader: nickname}),
            ...(newMovesScore && {movesLeader: nickname})            
        };        
        setPostBody(scoreData);
        setButtonText(<CircularProgress />);
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
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewHighScoreDialog;