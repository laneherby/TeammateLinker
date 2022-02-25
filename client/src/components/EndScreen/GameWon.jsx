import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Team from '../GameScreen/Team';
import { NewHighScoreDialog } from '../Dialogs';

const GameWon = ({ resetGame, winningTeam, highScore, userScore }) => {
    const [teamMarkup, setTeamMarkup] = useState("");
    const [newMovesScore, setNewMovesScore] = useState(false);
    const [newTimeScore, setNewTimeScore] = useState(false);
    const [openScoreDialog, setOpenScoreDialog] = useState(false);
    const [winningTime, setWinningTime] = useState({});
    const [winningMoves, setWinningMoves] = useState(0);

    useEffect(() => {
        if(winningTeam.length > 1) {
            const roster = {
                "_id": {
                    "team": "WIN",
                    "year": ""
                },
                "results": winningTeam
            };

            setTeamMarkup(<Box className={"winningTeamContainer"}><Team roster={roster} changeSelectedPlayer={() => {}} /></Box>);
        }
        
        const userScoreSeconds = convertStopwatchToSeconds(userScore.time);

        if(highScore === "no_scores") {
            setNewMovesScore(true);
            setNewTimeScore(true);
            setOpenScoreDialog(true);
        }
        else {
            if(userScoreSeconds < highScore.seconds) {
                setNewTimeScore(true);
                setOpenScoreDialog(true);
                setWinningTime(userScore.time);
            }
            else {
                setWinningTime(convertSecondsToStopwatch(highScore.seconds));
            }
                
            if(userScore.moves < highScore.moves) {
                setNewMovesScore(true);
                setWinningMoves(userScore.moves);                
            }
            else {
                setWinningMoves(highScore.moves);
            }
        }
        
    }, [winningTeam, highScore, userScore]);

    const updateName = (nickname) => {
        console.log(nickname);
        setOpenScoreDialog(false);
    };

    const convertStopwatchToSeconds = (time) => {
        const hourSeconds = parseInt(time.hours) * 3600;
        const minuteSeconds = parseInt(time.minutes) * 60;
        const seconds = parseInt(time.seconds);
        const msSeconds = parseInt(time.ms) / 1000;

        return hourSeconds + minuteSeconds + seconds + msSeconds;
    };

    const convertSecondsToStopwatch = (seconds) => {
        const timeArray = new Date(seconds * 1000).toISOString().substring(11, 19).split(':');
        const secondsAndMilliseconds = timeArray[2].split('.');

        const displayTime = {
            "hours": timeArray[0],
            "minutes": timeArray[1],
            "seconds": secondsAndMilliseconds[0],
            "ms": secondsAndMilliseconds[1]
        };

        return displayTime;
    };

    return (
        <React.Fragment>
            <NewHighScoreDialog 
                open={openScoreDialog}
                newMovesScore={newMovesScore}
                newTimeScore={newTimeScore}
                updateNameAndClose={updateName}
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
                                laneherby14:
                            </span>
                            <span className="scoreAmount">
                                3
                            </span>
                        </div>
                    </Box>
                    <Box className={"timeBestContainer"}>
                        <div className="scoreTitle">
                            Lowest Time
                        </div>
                        <div className="scoreValues">
                            <span className="scoreNickname">
                                laneherby14:
                            </span>
                            <span className="scoreAmount">
                                3
                            </span>
                        </div>
                    </Box>
                </Box>
                <Box className={"playAgainButtonContainer"}>
                    <Button 
                        variant="contained"
                        className={"startButton playAgainButton glossyButtons"}
                        onClick={() => resetGame("GAME_CHOICE")}
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