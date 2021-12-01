import React from "react";
import Title from "./Title";
import { Box, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import ShuffleIcon from '@mui/icons-material/Shuffle';

//TODO ADD GO BACK BUTTON TO BOTH THE GAME SELECTION SCREENS

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
                    <span>
                        CREATE GAME <Tooltip
                            title="This allows you to search for start and end players for your own game."
                            placement="top"
                        >
                            <HelpIcon />
                        </Tooltip>
                    </span>
                    <IconButton 
                        variant="contained" 
                        className={"chooseGameButtons createOwnButton"}
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Box className={"gameChoiceContainer"}>
                    <span>
                        RANDOM GAME <Tooltip
                            title="This will let you roll for random start and end players for the game."
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