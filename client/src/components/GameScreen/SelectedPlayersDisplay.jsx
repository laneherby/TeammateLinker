import React from 'react';
import { Box } from '@mui/material';
import PlayerDisplay from './PlayerDisplay';

const SelectedPlayersDisplay = ({ currPlayer, startPlayer, endPlayer }) => {
    return (
        <Box className={"selectionsContainer"}>
            <PlayerDisplay
                topText={"Start Player"}
                playerImage={startPlayer.image}
                playerName={startPlayer.name}
            />
            <PlayerDisplay
                topText={"Selected Player"}
                playerImage={currPlayer.image}
                playerName={currPlayer.name}
            />
            <PlayerDisplay
                topText={"End Player"}
                playerImage={endPlayer.image}
                playerName={endPlayer.name}
            />
        </Box>
    );
};

export default SelectedPlayersDisplay;