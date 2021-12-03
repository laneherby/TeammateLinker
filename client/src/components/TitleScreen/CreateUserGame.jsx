import React, { useState } from "react";
import { Box } from '@mui/material';
import Title from "./Title";
import GoBackArrow from "./GoBackArrow";
import PlayerAutocomplete from "./PlayerAutocomplete";

const CreateUserGame = ({ goBack }) => {
    return (
        <Box className={"gameContainer"}>
            <GoBackArrow goBack={goBack} />
            <Title />
            <Box className={"choicesContainer"}>
                <Box className={"paramsBorder"}>
                    <Box className={"paramsLabel"}>
                        <h3>CHOOSE PLAYERS</h3>
                    </Box>
                    <Box className={"paramsContainer"}>
                        <PlayerAutocomplete label={"Start Player"} />
                        <PlayerAutocomplete label={"End Player"} />
                    </Box>
                </Box>
                <Box sx={{height:"50vh", width:"100%", backgroundColor:"red"}}></Box>
            </Box>
        </Box>
    );
};

export default CreateUserGame;