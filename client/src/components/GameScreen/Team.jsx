import React from "react";
import { Box, List, ListItem} from '@mui/material';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './../../styles/App.css';
import { teamData } from '../../data/teamData';

const Team = ({ roster, changeSelectedPlayer }) => {

    const teamStyles = {
        "sxContainer": {
            "background": teamData[roster._id.team].primary
        },
        "sxTeamName": {
            "background": `linear-gradient(45deg, ${teamData[roster._id.team].primary} 0% 50%, 
                ${teamData[roster._id.team].secondary} 50% 100%)`,
            "borderBottom": `3px solid ${teamData[roster._id.team].secondary}`
        },
        "sxTeamList": {
            "backgroundColor": teamData[roster._id.team].primary
        },
        "sxListPlayer": {
            "borderBottom": `3px solid ${teamData[roster._id.team].secondary}`
        }
    };

    return (
        <Box className={"teamContainer"} sx={teamStyles.sxContainer}>
            <Box className={"teamName"} sx={teamStyles.sxTeamName}>
                <span className={"unselectableText"} title={`${roster._id.year} ${teamData[roster._id.team].location} ${teamData[roster._id.team].name}`}>
                    '{roster._id.year.toString().substring(2)} {teamData[roster._id.team].name}
                </span>
            </Box>
            <Box className={"teammateList"} sx={teamStyles.sxTeamList}>
                <SimpleBar style={{height: "100%"}}>
                    <List>
                        {roster.results.map((player) => {
                            return (
                                <ListItem 
                                    className={"listPlayer unselectableText"} 
                                    sx={teamStyles.sxListPlayer}                                    
                                    onClick={() => changeSelectedPlayer(player)}                                    
                                    key={roster._id.year + roster._id.team + player._id.substring(player._id.lastIndexOf("/")+1, player._id.lastIndexOf("."))}
                                >
                                    {player.name}
                                </ListItem>
                            )                            
                        })}
                    </List>
                </SimpleBar>
            </Box>
        </Box>
    );
};

export default Team;