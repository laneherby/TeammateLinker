import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Team from '../GameScreen/Team';
import MainContext from "../../context/MainContext";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { NewHighScoreDialog } from '../Dialogs';

const GameWon = () => {
    const {
        states, changeGameStateCtx, numMoves, totalSecondsPlayed, playTime, selectionHistory, startPlayer, endPlayer, convertSecondsToStopwatch
    } = useContext(MainContext);
    const { data } = useAxiosFetch(`/api/checkhighscore?playerOne=${startPlayer._id}&playerTwo=${endPlayer._id}`, "GET");

    const [highScore, setHighScore] = useState("");
    const [teamMarkup, setTeamMarkup] = useState("");
    const [newMovesScore, setNewMovesScore] = useState(false);
    const [newTimeScore, setNewTimeScore] = useState(false);
    const [openScoreDialog, setOpenScoreDialog] = useState(false);
    const [winningTime, setWinningTime] = useState({});
    const [winningMoves, setWinningMoves] = useState(0);
    const [movesLeader, setMovesLeader] = useState("");
    const [timeLeader, setTimeLeader] = useState("");

    useEffect(() => {
        setHighScore(data);
    }, [data]);

    useEffect(() => {
        if(selectionHistory.value.length > 1) {
            const roster = {
                "_id": {
                    "team": "WIN",
                    "year": ""
                },
                "results": selectionHistory.value
            };

            setTeamMarkup(<Box className={"winningTeamContainer"}><Team roster={roster} changeSelectedPlayer={() => {}} /></Box>);
        }

        if(highScore === "no_scores") {
            setNewMovesScore(true);
            setNewTimeScore(true);
            setOpenScoreDialog(true);
        }
        else {
            if(totalSecondsPlayed < highScore.seconds) {
                setNewTimeScore(true);
                setOpenScoreDialog(true);
                setWinningTime(playTime);
            }
            else {
                setWinningTime(convertSecondsToStopwatch(highScore.seconds));
                setTimeLeader(highScore.timeLeader);
            }
                
            if(numMoves < highScore.moves) {
                setNewMovesScore(true);                
                setOpenScoreDialog(true);
                setWinningMoves(numMoves);                
            }
            else {
                setWinningMoves(numMoves);
                setMovesLeader(highScore.movesLeader)
            }
        }
    }, [highScore]);

    const closeHighScoreDialog = (nickname) => {
        if(newMovesScore) setMovesLeader(nickname);
        if(newTimeScore) setTimeLeader(nickname);
        setOpenScoreDialog(false);        
    };    

    return (
        <React.Fragment>
            <NewHighScoreDialog 
                open={openScoreDialog}
                newMovesScore={newMovesScore}
                newTimeScore={newTimeScore}
                close={closeHighScoreDialog}
            />
            <Box className={"endScreenContainer"}>
                <Box className={"gameEndText"}>
                    WINNER!
                </Box>
                <Box className={"scoresBestContainer"}>
                    <Box className={"movesBestContainer"}>
                        <div className="scoreTitle">
                            Lowest # of Moves
                        </div>
                        <div className="scoreValues">
                            <span className="scoreNickname">
                                {movesLeader}:
                            </span>
                            <span className="scoreAmount">
                                {winningMoves}
                            </span>
                        </div>
                    </Box>
                    <Box className={"timeBestContainer"}>
                        <div className="scoreTitle">
                            Lowest Time
                        </div>
                        <div className="scoreValues">
                            <span className="scoreNickname">
                                {timeLeader}: 
                            </span>
                            <span className="scoreAmount">
                                {winningTime.minutes}:{winningTime.seconds}<span className="scoreMilliseconds">{winningTime.ms}</span>
                            </span>
                        </div>
                    </Box>
                </Box>
                <Box className={"playAgainButtonContainer"}>
                    <Button 
                        variant="contained"
                        className={"startButton playAgainButton glossyButtons"}
                        onClick={() => changeGameStateCtx(states.GAME_CHOICE)} //NEED TO CLEAR SELECTION HISTORY BEFORE STARTING NEW GAME
                    >
                        PLAY AGAIN
                    </Button>
                </Box>
                {teamMarkup}
            </Box>
        </React.Fragment>
    );
};

export default GameWon;