import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ReactComponent as PlayerSilhouette } from '../../styles/assets/silhouette.svg';

const PlayerCard = (props) => {
    const [cardRotate, setCardRotate] = useState("");
    const [playerName, setPlayerName] = useState("")
    const [playerImage, setPlayerImage] = useState("")

    useEffect(() => {
        if(props.playerName !== "" && props.playerImage !== "") {
            setCardRotate("rotateY(-180deg");

            setTimeout(() => {
                setPlayerName(props.playerName);
                setPlayerImage(props.playerImage);
            }, 1200);

            setTimeout(() => {
                setCardRotate("rotateY(180deg)")
            }, 2000);
        }
    }, [playerName, playerImage, props.playerName, props.playerImage])

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