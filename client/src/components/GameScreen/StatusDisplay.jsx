import { useEffect, useRef, useContext } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MainContext from "../../context/MainContext";

const StatusDisplay = () => {
    const {
        selectionHistory, goBackInHistoryToPlayer, numMoves,
        isMobile, time, startTimer
    } = useContext(MainContext);
    const sWatchContainer = useRef(null);

    useEffect(() => {
        startTimer();
        // eslint-disable-next-line
    },[]);

    useEffect(() => {

        //have to wait just a bit because the timer isn't fully rendered in right away?
        setTimeout(() => {
            //get width of stopwatch and container
            const stopwatchWidth = Math.ceil(sWatchContainer.current.firstChild.getBoundingClientRect().width - 5);
            const containerWidth = Math.ceil(sWatchContainer.current.getBoundingClientRect().width);
            const emptySpace = containerWidth - stopwatchWidth;

            //take half of the empty space left and make it the left margin of the stopwatch span
            sWatchContainer.current.firstChild.style.marginLeft = `${emptySpace / 2}px`;
        }, 100);        
    }, [sWatchContainer]);

    const handleOnChange = (e) => {
        goBackInHistoryToPlayer(e.target.value);
    };

    const renderStopwatch = () => {
        return (
            <Box className={"stopwatchContainer statusBox"} ref={sWatchContainer}>
                <span>
                {time.hours}:{time.minutes}:{time.seconds}
                </span>
            </Box>
        );
    };

    const renderMoves = () => {
        return (
            <Box className={"moveCountContainer statusBox"}>
                Moves: {numMoves}
            </Box>
        );
    };

    const renderOptions = () => {
        return (
            selectionHistory.value.slice(0).reverse().map((player) => {
                return (
                    <MenuItem
                        data-player-id={player._id}
                        key={player._id.substring(player._id.lastIndexOf("/")+1, player._id.lastIndexOf("."))}
                        value={player._id}
                        sx={{fontFamily: "KanitItalic !important"}}
                    >
                        {player.name}
                    </MenuItem>
                );
            })
        );
    };

    const renderSelect = () => {
        return (
            <Box className={"historySelectContainer statusBox"}>
                <FormControl 
                    sx={{width: "100%"}} 
                    size={(isMobile) ? "small" : "medium"}
                >
                    <InputLabel 
                        id="historySelectLabelID"
                        sx={{fontFamily: "KanitItalic !important"}}
                    >
                        History
                    </InputLabel>
                    <Select
                        labelId="historySelectLabelID"
                        label="History"
                        onChange={(e) => handleOnChange(e)}                        
                        value={""}
                        sx={{fontFamily: "KanitItalic !important"}}
                    >                        
                        {renderOptions()}
                    </Select>
                </FormControl>
            </Box>
        );
    };

    const renderStatuses = () => {
        if(isMobile) {
            return (
                <Box className={"statusContainer"}>
                    <Box className={"movesMobileContainer"}>
                        {renderMoves()}
                        {renderStopwatch()}
                    </Box>
                    <Box className={"historyMobileContainer"}>
                        {renderSelect()}
                    </Box>
                </Box>
            );
        }
        else {
            return (
                <Box className={"statusContainer"}>
                    {renderStopwatch()}
                    {renderSelect()}
                    {renderMoves()}
                </Box>
            );
        }
    };

    return (
        renderStatuses()
    );
};

export default StatusDisplay;