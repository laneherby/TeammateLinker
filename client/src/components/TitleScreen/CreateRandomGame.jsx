import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import PlayerCard from './PlayerCard';
import Title from './Title';
import GoBackArrow from './GoBackArrow';

const CreateRandomGame = ({ startPlayer, endPlayer, rollPlayers, startTheGame, goBack }) => {
    const currYear = new Date().getFullYear();
    const [startYear, setStartYear] = useState(2010);    
    const [endYear, setEndYear] = useState(currYear);
    const [rollCooldown, setRollCooldown] = useState(false);
    const [canStartGame, setCanStartGame] = useState(false);

    const checkNumber = (e) => {
        if(e.keyCode === 8 || e.keyCode === 46 ||
            e.keyCode === 37 || e.keyCode === 39) return;
        
        if(!(/^[0-9\s]*$/).test(e.key)) {
            e.preventDefault();
            console.log(e.keyCode);
        }
    };

    const rollButtonClick = () => {
        let paramStartYear = startYear;
        let paramEndYear = endYear;
        setRollCooldown(true);
        
        if(isNaN(startYear) || parseInt(startYear) < 1900 || parseInt(startYear) > currYear) {
            paramStartYear = "1900";
            setStartYear(1900);
        }

        if(isNaN(endYear) || parseInt(endYear) < 1900 || parseInt(endYear) > currYear) {
            paramEndYear = currYear;
            setEndYear(currYear);
        }

        if(startYear > endYear) {
            [paramStartYear, paramEndYear] = [endYear, startYear];
            setStartYear(paramStartYear);
            setEndYear(paramEndYear);
        }

        rollPlayers(paramStartYear, paramEndYear);        

        setTimeout(() => {
            setRollCooldown(false);
            if(!canStartGame) setCanStartGame(true);
        }, 2000);
    }

    return (
        <Box className={"gameContainer"}>
            <GoBackArrow goBack={goBack} />
            <Title />
            <Box className={"choicesContainer"}>
                <Box className={"paramsBorder"}>
                    <Box className={"paramsLabel"}>
                        <h3>CHOOSE YEAR RANGE</h3>
                    </Box>
                    <Box className={"paramsContainer"}>
                        <TextField
                            label="Start Year"
                            value={startYear}
                            onKeyDown={checkNumber}
                            onChange={(e) => {setStartYear(e.target.value)}}
                            inputProps={{ maxLength: 4 }}
                        />

                        <TextField
                            label="End Year"
                            value={endYear}
                            onKeyDown={checkNumber}
                            onChange={(e) => {setEndYear(e.target.value)}}
                            inputProps={{ maxLength: 4 }}
                        />
                    </Box>
                </Box>
                <Box className={"playerCardContainer"}>                
                    <Box className={"playerCard"}>
                        <PlayerCard
                            playerName={startPlayer.name ?? ""} 
                            playerImage={startPlayer.image ?? ""}
                        />
                    </Box>
                    <Box className={"playerCard"}>
                        <PlayerCard
                            playerName={endPlayer.name ?? ""}
                            playerImage={endPlayer.image ?? ""}
                        />
                    </Box>
                </Box>
                <Box className={"rollStartContainer"}>
                    <Button 
                        variant="contained"
                        className={"rollButton titleButtons glossyButtons"}
                        disabled={rollCooldown}
                        onClick={rollButtonClick}
                    >
                        ROLL PLAYERS
                    </Button>
                    <Button 
                        variant="contained"
                        className={"startButton titleButtons glossyButtons"}
                        disabled={!canStartGame}
                        onClick={() => startTheGame("GAME_STARTED")}
                    >
                        START GAME
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CreateRandomGame;