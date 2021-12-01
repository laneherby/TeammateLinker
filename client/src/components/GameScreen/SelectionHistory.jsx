import React, { useRef, useEffect, useState } from 'react';
import ScrollArrows from './ScrollArrows';
import { Box, List, ListItem } from '@mui/material';
import './../../styles/App.css';

const SelectionHistory = ({ history, handleHistoryClick }) => {
    const historyRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        if(historyRef.current) historyRef.current.scrollLeft = 0;

        setShowArrows((history.length > 5) ? true : false);
    }, [history]);

    return (
        <Box className={"historyContainer"}>
            {
                showArrows &&
                <ScrollArrows 
                    scrollRef={historyRef} 
                    chevWidth={"50px"} 
                    chevHeight={"50px"}
                    chevClassLeft={"histChevronLeft"}
                    chevClassRight={"histChevronRight"}
                />
            }
            <Box className={"historyScrollerContainer"}>
                <Box className={"historyTitle unselectableText"}>
                    Selection History
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
                                    >
                                        {player.name}
                                    </ListItem>
                                );
                            })}
                        </List>
                    }
                </Box>
            </Box>
        </Box>
    )
};

export default SelectionHistory;