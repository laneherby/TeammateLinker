import React from "react";
import { Box } from '@mui/material';

const PlayerDisplay = ({ topText, playerName, playerImage }) => {
    return (
        <Box className={"displayCardContainer"}>
            <span>{topText}</span>
            <img
                className={"displayCardImage"}
                src={playerImage} 
                alt={playerName}  
            />
            <span>{playerName}</span>       
        </Box>
    );
};

export default PlayerDisplay;