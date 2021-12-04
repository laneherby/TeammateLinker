import React from "react";
import Title from "./Title";
import { Box, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const ChooseGame =({ setGameType }) => {
    
    const handleRandomClick = () => {
        setGameType("r");
    };

    const handleSearchClick = () => {
        setGameType("s");
    };

    return (
        <Box className={"chooseGameContainer"}>
            <Title />
            <Box className={"gamesChoicesContainer"}>
                <Box className={"gameChoiceContainer"}>
                    <span className={"unselectableText"}>
                        CREATE GAME <Tooltip
                            title={<span className={"toolTipText"}>This allows you to search for start and end players for your own game.</span>}
                            placement="top"
                        >
                            <HelpIcon />
                        </Tooltip>
                    </span>
                    <IconButton 
                        variant="contained" 
                        className={"chooseGameButtons createOwnButton"}
                        onClick={handleSearchClick}
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Box className={"gameChoiceContainer"}>
                    <span className={"unselectableText"}>
                        RANDOM GAME <Tooltip
                            title={<span className={"toolTipText"}>This will let you roll for random start and end players for the game.</span>}
                            placement="top"
                        >
                            <HelpIcon />
                        </Tooltip>
                    </span>
                    <IconButton 
                        variant="contained" 
                        className={"chooseGameButtons createRandomButton"}
                        onClick={handleRandomClick}
                    >
                        <ShuffleIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default ChooseGame;