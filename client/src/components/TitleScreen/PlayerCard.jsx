import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ReactComponent as PlayerSilhouette } from '../../styles/assets/silhouette.svg';

const PlayerCard = ({ playerName, playerImage }) => {
    const [cardRotate, setCardRotate] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [displayImage, setDisplayImage] = useState("");

    useEffect(() => {
        if(playerName !== "" && playerImage !== "") {
            setCardRotate("rotateY(-180deg");

            setTimeout(() => {
                setCardRotate("rotateY(180deg)")
            }, 2000);

            setTimeout(() => {
                setDisplayImage(playerImage);
                setDisplayName(playerName)
            }, 1200);
        }
        else {
            setCardRotate("rotateY(-180deg");
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
                        src={displayImage} 
                        alt={displayName} 
                    />
                    <Box className={"playerNameCard"}>
                        {displayName}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PlayerCard;