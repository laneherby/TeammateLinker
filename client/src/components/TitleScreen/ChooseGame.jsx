import { useContext } from "react";
import Title from "./Title";
import { Box, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import MainContext from '../../context/MainContext';

const ChooseGame =() => {
    const { states, changeGameStateCtx } = useContext(MainContext);
    
    const handleRandomClick = () => {
        changeGameStateCtx(states.RANDOM_GAME_SELECTED);
    };

    const handleSearchClick = () => {
        changeGameStateCtx(states.USER_GAME_SELECTED);
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
            {/* <Box>
                width: {window.innerWidth} <br />
                height: {window.innerHeight} <br />
                availWidth: {window.screen.availWidth} <br />
                availHeight: {window.screen.availHeight}
            </Box> */}
        </Box>
    );
}

export default ChooseGame;