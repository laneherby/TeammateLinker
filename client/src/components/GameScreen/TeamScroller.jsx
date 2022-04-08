import { useRef, useEffect, useState, useContext } from "react";
import { Box, LinearProgress } from '@mui/material';
import Team from './Team';
import { ScrollArrows } from "../Icons";
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { teamData } from '../../data/teamData';
import MainContext from "../../context/MainContext";
import useAxiosFetch from "../../hooks/useAxiosFetch";


const TeamScroller = () => {
    const { selectedPlayer } = useContext(MainContext);
    const [fetchURL, setFetchURL] = useState("");
    const { data } = useAxiosFetch(fetchURL, "GET");
    const tmmateContainer = useRef();
    const [teammates, setTeammates] = useState([]);
    const [teammatesLoaded, setTeammatesLoaded] = useState(false);
    const [showArrows, setShowArrows] = useState(true);
    const { wWidth } = useWindowDimensions();


    useEffect(() => {
        if(selectedPlayer !== "" || selectedPlayer) {
            setTeammatesLoaded(false);

            const playerID = (selectedPlayer.hasOwnProperty("_id")) ? selectedPlayer._id : selectedPlayer.id;
            setFetchURL(`/api/getteammates/${encodeURIComponent(playerID)}`);
            
            if((wWidth > 1330 && data.length <= 4) || (wWidth > 768 && data.length <=3)) {
                setShowArrows(false);
            }
        }
        // eslint-disable-next-line
    }, [selectedPlayer]);

    useEffect(() => {        
        setTeammates(data);
        setTeammatesLoaded(true);
    }, [data]);

    useEffect(() => {
        if((wWidth > 1330 && teammates.length <= 4) || (wWidth > 768 && teammates.length <=3) || (wWidth < 768)) {
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
                <Box sx={{height: "100%"}}>
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