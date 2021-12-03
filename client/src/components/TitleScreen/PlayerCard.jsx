import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ReactComponent as PlayerSilhouette } from '../../styles/assets/silhouette.svg';

const PlayerCard = ({ playerName, playerImage }) => {
    const [cardRotate, setCardRotate] = useState("");

    useEffect(() => {
        if(playerName !== "" && playerImage !== "") {
            setCardRotate("rotateY(-180deg");

            setTimeout(() => {
                setCardRotate("rotateY(180deg)")
            }, 2000);
        }
    }, [playerName, playerImage])

    return (
        <Box className={"flipCard"}>
            <Box
                sx={{transform: cardRotate}} 
                className={"flipCardContent"}
            >
                <Box className={"cardFront"}>
                    <PlayerSilhouette />
                    <Box className={"playerNameCard"}>
                        NO PLAYER
                    </Box>
                </Box>
                <Box className={"cardBack"}>
                    <img 
                        className={"playerImageCard"} 
                        src={playerImage} 
                        alt={playerName} 
                    />
                    <Box className={"playerNameCard"}>
                        {playerName}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PlayerCard;