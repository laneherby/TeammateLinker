import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from '@mui/material';
import Title from "./Title";
import { GoBackArrow } from '../Icons';
import PlayerAutocomplete from "./PlayerAutocomplete";
import PlayerCard from "./PlayerCard";

const CreateUserGame = ({ goBack, startPlayer, endPlayer, userSetPlayer, startTheGame, isMobile }) => {
    const [canStartGame, setCanStartGame] = useState(false);
    const cardContainer = useRef();

    useEffect(() => {
        if(typeof(startPlayer) === "object" && typeof(endPlayer) === "object") {
            setTimeout(() => {
                setCanStartGame(true);
            }, 1200);
        }
        else {
            setCanStartGame(false);
        }
    }, [startPlayer, endPlayer]);

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
            <GoBackArrow goBack={goBack} />
            <Title />
            <Box className={"choicesContainer"}>
                <Box className={"paramsBorder"}>
                    <Box className={"paramsLabel"}>
                        <h3>CHOOSE PLAYERS</h3>
                    </Box>
                    <Box className={"paramsContainer"}>
                        <PlayerAutocomplete 
                            label={"Start Player"}
                            autocSetPlayer={userSetPlayer}
                            keyboardUp={keyboardUp}
                            keyboardDown={keyboardDown}
                            isMobile={isMobile}
                        />
                        <PlayerAutocomplete 
                            label={"End Player"}
                            autocSetPlayer={userSetPlayer}
                            keyboardUp={keyboardUp}
                            keyboardDown={keyboardDown}
                            isMobile={isMobile}
                        />
                    </Box>
                </Box>
                <Box className={"playerCardContainer"} ref={cardContainer}>
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
};

export default CreateUserGame;