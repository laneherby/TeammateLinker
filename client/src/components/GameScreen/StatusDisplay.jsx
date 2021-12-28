import React, { useEffect, useState, useRef } from "react";
import { Box, FormControl, InputLabel, Select, Tooltip } from '@mui/material';
import useStopwatch from "../../hooks/useStopwatch";

const StatusDisplay = () => {
    const { time, startTimer, stopTimer } = useStopwatch();
    const sWatchContainer = useRef(null);

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {

        //have to wait just a bit because the timer isn't fully rendered in right away?
        setTimeout(() => {
            //get width of stopwatch and container
            const stopwatchWidth = Math.ceil(sWatchContainer.current.firstChild.getBoundingClientRect().width - 5);
            const containerWidth = Math.ceil(sWatchContainer.current.getBoundingClientRect().width);
            const emptySpace = containerWidth - stopwatchWidth;
            console.log(containerWidth, stopwatchWidth, (emptySpace/2));

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
                
            </Box>
            <Box className={"moveCountContainer statusBox"}>
                
            </Box>
        </Box>
    );
};

export default StatusDisplay;