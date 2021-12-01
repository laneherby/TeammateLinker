import React, { useRef, useEffect, useState } from "react";
import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import Team from './Team';
import ScrollArrows from './ScrollArrows';
import './../../styles/App.css';
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { teamData } from '../../data/teamData';


const TeamScroller = ({ selectedPlayer, changeSelectedPlayer }) => {
    const tmmateContainer = useRef();
    const [teammates, setTeammates] = useState([]);
    const [teammatesLoaded, setTeammatesLoaded] = useState(false);
    const [showArrows, setShowArrows] = useState(true);
    const { wWidth } = useWindowDimensions();

    useEffect(() => {
        if(selectedPlayer !== "" || selectedPlayer) {
            setTeammatesLoaded(false);

            const playerID = (selectedPlayer.hasOwnProperty("_id")) ? selectedPlayer._id : selectedPlayer.id;

            axios.get(`/api/getteammates/${encodeURIComponent(playerID)}`).then((res) => {
                setTeammates(res.data);
                setTeammatesLoaded(true);
                
                if((wWidth > 1330 && res.data.length <= 4) || (wWidth > 768 && res.data.length <=3)) {
                    setShowArrows(false);
                }
            });
        }
        // eslint-disable-next-line
    }, [selectedPlayer]);

    useEffect(() => {
        if((wWidth > 1330 && teammates.length <= 4) || (wWidth > 768 && teammates.length <=3)) {
            setShowArrows(false);
        }
        else {
            setShowArrows(true);
        }
    }, [wWidth, teammates.length]);

    return (
        <Box className={"teamScrollerContainer"}>
            {   
                !teammatesLoaded &&
                <Box className={"loadingTmContainer"}>
                    <span className={"loadingTmText"}>LOADING TEAMMATES...</span>
                    <LinearProgress sx={{width: "100%"}} />
                </Box>
            }
            {
                teammatesLoaded &&
                <Box>
                    {
                        showArrows &&
                        <ScrollArrows 
                            scrollRef={tmmateContainer} 
                            chevHeight={"100px"} 
                            chevWidth={"100px"}
                            chevClassLeft={"chevronLeft"}
                            chevClassRight={"chevronRight"}
                        />
                    }
                    <Box 
                        ref={tmmateContainer} 
                        className={"teammatesContainer"}
                        sx={{justifyContent: teammates.length > 2 ? "space-between" : "space-around"}}
                    >
                        {teammates.map((roster) => {
                            return ((roster._id.team in teamData) 
                                ? <Team 
                                    roster={roster} 
                                    changeSelectedPlayer={changeSelectedPlayer}
                                    key={roster._id.year + roster._id.team}
                                  /> 
                                : null);
                        })}
                    </Box>
                </Box>
            }           
        </Box>
    );
};

export default TeamScroller;