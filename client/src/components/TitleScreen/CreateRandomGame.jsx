import { useState, useRef, useContext, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import PlayerCard from './PlayerCard';
import Title from './Title';
import { GoBackArrow } from '../Icons';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import MainContext from '../../context/MainContext';

const CreateRandomGame = ({ rollPlayers }) => {
    const {
        setStartPlayer, startPlayer, setEndPlayer, endPlayer, states, changeGameStateCtx, isMobile 
    } = useContext(MainContext);

    const [fetchURL, setFetchURL] = useState("");
    const { data } = useAxiosFetch(fetchURL, "GET");

    const currYear = new Date().getFullYear();
    const cardContainer = useRef();
    const [startYear, setStartYear] = useState(2010);    
    const [endYear, setEndYear] = useState(currYear);
    const [rollCooldown, setRollCooldown] = useState(false);
    const [canStartGame, setCanStartGame] = useState(false);
    const [rollCounter, setRollCounter] = useState(1);

    useEffect(() => {
        if(data && data.length > 0) {
            setCanStartGame(true);
            setStartPlayer(data[0]);
            setEndPlayer(data[1]);
        } else {
            setCanStartGame(false);
        }
    }, [data, setStartPlayer, setEndPlayer]);

    const checkNumber = (e) => {
        if(e.keyCode === 8 || e.keyCode === 46 ||
            e.keyCode === 37 || e.keyCode === 39) return;
        
        if(!(/^[0-9\s]*$/).test(e.key)) {
            e.preventDefault();
        }
    };

    const rollButtonClick = () => {
        setRollCooldown(true);

        let paramStartYear = startYear;
        let paramEndYear = endYear;
        cardContainer.current.style.display = "flex";
        
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

        setFetchURL(`/api/gettwoplayers?startYear=${startYear}&endYear=${endYear}&numRolls=${rollCounter}`);

        setTimeout(() => {
            setRollCooldown(false);
            setRollCounter(rollCounter+1);
            setCanStartGame(true);
        }, 2000);
    };

    const keyboardUp = () => {
        if(isMobile) {
            cardContainer.current.style.display = "none";            
        }
    };

    const keyboardDown = () => {
        if(isMobile) {
            cardContainer.current.style.display = "flex";
        }
    };

    return (
        <Box className={"gameContainer"}>
            <GoBackArrow />
            <Title />
            <Box className={"choicesContainer"}>
                <Box className={"paramsBorder"}>
                    <Box className={"paramsLabel"}>
                        <h3>CHOOSE YEAR RANGE</h3>
                    </Box>
                    <Box className={"paramsContainer"}>
                        <TextField
                            label="Start Year"
                            className={"randomYearInput gameTextFields"}
                            value={startYear}
                            onKeyDown={checkNumber}
                            onChange={(e) => {setStartYear(e.target.value)}}
                            inputProps={{ 
                                maxLength: 4,
                                type: "tel",
                                onFocus: keyboardUp,
                                onBlur: keyboardDown
                            }}                            
                        />

                        <TextField
                            label="End Year"
                            className={"randomYearInput gameTextFields"}
                            value={endYear}
                            onKeyDown={checkNumber}
                            onChange={(e) => {setEndYear(e.target.value)}}
                            inputProps={{ 
                                maxLength: 4,
                                type: "tel",
                                onFocus: keyboardUp,
                                onBlur: keyboardDown
                            }}
                        />
                    </Box>
                </Box>
                <Box className={"playerCardContainer"} ref={cardContainer}>
                    <Box className={"playerCard"}>
                        <PlayerCard
                            playerName={(startPlayer) ? startPlayer.name : ""} 
                            playerImage={(startPlayer) ? startPlayer.image : ""}
                        />
                    </Box>
                    <Box className={"playerCard"}>
                        <PlayerCard
                            playerName={(endPlayer) ? endPlayer.name : ""}
                            playerImage={(endPlayer) ? endPlayer.image : ""}
                        />
                    </Box>
                </Box>
                <Box className={"rollStartContainer"}>
                    <Button 
                        variant="contained"
                        className={"rollButton titleButtons glossyButtons"}
                        disabled={rollCooldown}
                        onClick={rollButtonClick}
                        onMouseDown={rollButtonClick}
                    >
                        ROLL PLAYERS
                    </Button>
                    <Button 
                        variant="contained"
                        className={"startButton titleButtons glossyButtons"}
                        disabled={!canStartGame}
                        onClick={() => changeGameStateCtx(states.GAME_STARTED)}
                        onMouseDown={() => changeGameStateCtx(states.GAME_STARTED)}
                    >
                        START GAME
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CreateRandomGame;