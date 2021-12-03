import React,  { useState } from "react";
import { Box, Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

const PlayerAutocomplete = ({ label }) => {
    const [searchResults, setSearchResults] = useState([]);

    const getSearchResults = (e) => {
        if(e.target.value.length >= 3) {
            axios.get(`/api/search/${e.target.value}`).then((res) => {
                setSearchResults(res.data);
                console.log(res.data);
            });
        }
        else {
            setSearchResults([]);
        }
    };

    const checkLetters = (e) => {
        if(!(/^[a-zA-Z\s]*$/).test(e.key)) {
            e.preventDefault();
        }
    };

    const getLabelYears = (player) => {
        if(player.teams.length === 1 && player.teams[0].years.length === 1) 
            return `(${player.teams[0].years[0]})`;

        let playerYears = player.teams.map(p => p.years).flat();
        playerYears.sort((a,b) => a - b);
        return `(${playerYears[0]} - ${playerYears[playerYears.length - 1]})`;
    };

    return (
        <Autocomplete
            className={"autocompleteBoxes"}
            freeSolo
            disableClearable
            onKeyDown={checkLetters}
            onKeyUp={getSearchResults}
            options={searchResults}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
                return (
                    <li 
                        {...props} 
                        key={option._id.substring(option._id.lastIndexOf("/")+1, option._id.lastIndexOf("."))}
                        label={option.name}
                    >
                        {option.name} {getLabelYears(option)}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        type: "search",
                    }}
                />
            )}
        />
    );
};

export default PlayerAutocomplete;