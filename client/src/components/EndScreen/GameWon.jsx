import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Team from '../GameScreen/Team';
import useWindowDimensions from '../../hooks/useWindowDimensions'

const GameWon = ({ resetGame, winningTeam }) => {
    const { width, height } = useWindowDimensions();
    const [winners, setWinners] = useState("");

    useEffect(() => {
        const roster = {
            "_id": {
                "team": "WIN",
                "year": ""
            },
            "results": winningTeam
        };

        setWinners(roster);
    }, [winningTeam]);

    return (
        <React.Fragment>
            <Confetti
                width={width}
                height={height}
            />
            
            <Box className={"gameWonContainer"}>
                <Box className={"gameWonText"}>
                    WINNER!
                </Box>
                <Box className={"playAgainButtonContainer"}>
                    <Button 
                        variant="contained"
                        className={"startButton playAgainButton glossyButtons"}
                        onClick={resetGame}
                    >
                        PLAY AGAIN
                    </Button>
                </Box>
                {
                    winners && 
                    <Box className={"winningTeamContainer"}>
                        <Team roster={winners} changeSelectedPlayer={() => {}} />
                    </Box>
                }
            </Box>
        </React.Fragment>
    );
};

export default GameWon;