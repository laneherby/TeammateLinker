import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Team from '../GameScreen/Team';
import useWindowDimensions from '../../hooks/useWindowDimensions'

const GameWon = ({ resetGame, winningTeam, highScore }) => {
    const { width, height } = useWindowDimensions();
    const [teamMarkup, setTeamMarkup] = useState("");

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

        if(highScore === "no_scores") {
            
        }
    }, [winningTeam, highScore]);

    return (
        <React.Fragment>
            {/* <Confetti
                width={width}
                height={height}
            /> */}
            
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