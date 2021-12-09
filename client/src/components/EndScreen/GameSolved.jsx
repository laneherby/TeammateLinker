import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Team from '../GameScreen/Team';

const GameSolved = ({ resetGame, solvedTeam }) => {
    const [teamMarkup, setTeamMarkup] = useState("");

    useEffect(() => {
        if(solvedTeam.length > 1 && solvedTeam[0].toString() !== "NO ANSWERS") {
            const playerObjects = solvedTeam.map((p) => {return {"_id": `/${p.replace(" ", "")}.`, "name": p}});

            const roster = {
                "_id": {
                    "team": "WIN",
                    "year": ""
                },
                "results": playerObjects
            };

            setTeamMarkup(<Box className={"winningTeamContainer"}><Team roster={roster} changeSelectedPlayer={() => {}} /></Box>);
        }
        else if(solvedTeam.length === 1 && solvedTeam[0].toString() === "NO ANSWERS") {
            setTeamMarkup(<Box className={"noSolutionText"}><span>NO SOLUTION</span></Box>);
        }
    }, [solvedTeam]);

    return (
        <Box className={"endScreenContainer"}>
            <Box className={"gameEndText"}>
                SOLUTION
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
    );
};

export default GameSolved;