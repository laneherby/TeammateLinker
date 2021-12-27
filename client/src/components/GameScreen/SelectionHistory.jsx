import React, { useRef, useEffect, useState } from 'react';
import { ScrollArrows } from '../Icons';
import { Box, FormControl, InputLabel, List, ListItem, Select, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const SelectionHistory = ({ history, handleHistoryClick }) => {
    const historyRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        if(historyRef.current) historyRef.current.scrollLeft = 0;

        setShowArrows((history.length > 5) ? true : false);
    }, [history]);

    const renderHistorySelection = () => {

    };

    return (
        <Box className={"historyContainer"}>
            {
                // showArrows &&
                // <ScrollArrows 
                //     scrollRef={historyRef} 
                //     chevWidth={"5vh"} 
                //     chevHeight={"5vh"}
                //     chevClassLeft={"histChevronLeft"}
                //     chevClassRight={"histChevronRight"}
                // />
            }
            <Box className={"historyScrollerContainer"}>
                <FormControl>
                    <InputLabel>History</InputLabel>
                    <Select
                        displayEmpty
                        
                    >

                    </Select>
                </FormControl>
                {/* <Box className={"historyTitle unselectableText"}>
                    History <Tooltip
                            sx={{padding: "3px", marginLeft: "3px"}}
                            title={<span className={"toolTipText"}>This shows your past selections. If you click one of the player names it will take you back to that spot.</span>}
                            placement="top"
                        >
                            <HelpIcon />
                        </Tooltip>
                </Box>
                <Box className={"historyListContainer"}>
                    {
                        (history.length > 0 && history) &&
                        <List 
                            className={"historyList"}
                            ref={historyRef}
                        >
                            {history.slice(0).reverse().map((player) => {
                                return (
                                    <ListItem
                                        onClick={(e) => {handleHistoryClick(e.target.getAttribute("data-player-id"))}}
                                        className={"historyItem unselectableText"}
                                        data-player-id={player._id}
                                        key={player._id.substring(player._id.lastIndexOf("/")+1, player._id.lastIndexOf("."))}
                                    >
                                        {player.name}
                                    </ListItem>
                                );
                            })}
                        </List>
                    }
                </Box> */}
            </Box>
        </Box>
    )
};

export default SelectionHistory;