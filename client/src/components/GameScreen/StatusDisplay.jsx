import React, { useEffect, useRef } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useStopwatch from "../../hooks/useStopwatch";

const StatusDisplay = ({ history, handleHistoryClick, numMoves }) => {
    const { time, startTimer, stopTimer } = useStopwatch();
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

    return (
        <Box className={"statusContainer"}>
            <Box className={"stopwatchContainer statusBox"} ref={sWatchContainer}>
                <span>
                    {time.minutes}:{time.seconds}:{time.ms}
                </span>
            </Box>
            <Box className={"historySelectContainer statusBox"}>
                <FormControl sx={{width: "100%"}}>
                    <InputLabel 
                        id="historySelectLabelID"
                        sx={{fontFamily: "KanitItalic !important"}}
                    >
                        History
                    </InputLabel>
                    <Select
                        labelId="historySelectLabelID"
                        label="History"
                        onChange={(e) => handleHistoryClick(e.target.value)}
                        value={""}
                    >
                        {history.slice(0).reverse().map((player) => {
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
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box className={"moveCountContainer statusBox"}>
                Moves: {numMoves}
            </Box>
        </Box>
    );
};

export default StatusDisplay;