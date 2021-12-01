import React, { useState, useEffect } from "react";
import { Box, Autocomplete, TextField } from '@mui/material';
import Title from "./Title";
import GoBackArrow from "./GoBackArrow";

const CreateUserGame = ({ goBack }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {

    }, [searchResults, showResults])

    const onSearchChange = (e) => {

    };

    const checkLetters = (e) => {
        let charCode = (e.which) ? e.which : e.keyCode;
        if(!(charCode >= 65 && charCode <= 120) && (charCode !== 32 && charCode !== 0)) { 
            e.preventDefault(); 
        }
    };

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
                        <Autocomplete
                            sx={{width: "50%"}}
                            freeSolo
                            disableClearable
                            onKeyPress={checkLetters}
                            options={searchResults.map((p) => p.name)}
                            open={showResults}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Start Player"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: "search",
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateUserGame;