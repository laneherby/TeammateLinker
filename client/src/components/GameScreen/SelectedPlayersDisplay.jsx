import React from 'react';
import { Box } from '@mui/material';
import './../../styles/App.css';

const SelectedPlayersDisplay = ({ currentlySelected }) => {
    return (
        <Box sx={{height: "33vh !important", width: "100%", backgroundColor: "green"}}>
            <div>{currentlySelected.name}</div>
        </Box>
    )
};

export default SelectedPlayersDisplay;