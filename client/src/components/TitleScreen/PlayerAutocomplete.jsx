import { useState, useRef, useContext } from "react";
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import MainContext from "../../context/MainContext";

const PlayerAutocomplete = ({ label, keyboardUp, keyboardDown }) => {
    const {
        setStartPlayer, setEndPlayer, isMobile
    } = useContext(MainContext);
    const [searchResults, setSearchResults] = useState([]);
    const autoCompInput = useRef();

    const getSearchResults = (e) => {
        if(e.target.value.length >= 3) {
            axios.get(`/api/search/${e.target.value}`).then((res) => {
                setSearchResults(res.data);
            });
        }
        else {
            if(label === "Start Player") setStartPlayer("");
            if(label === "End Player") setEndPlayer("");
            setSearchResults([]);
        }
    };

    const playerSelected = (e, value) => {
        if(label === "Start Player") setStartPlayer(value);
        if(label === "End Player") setEndPlayer(value);
        if(isMobile) {
            autoCompInput.current.children[1].children[0].blur();
            keyboardDown();
        }
    };

    const checkLetters = (e) => {
        if(!(/^[a-zA-Z\s]*$/).test(e.key)) {
            e.preventDefault();
        }
    };

    const getLabelYears = (player) => {
        //If the play has only played for one year for one team just display on year
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
            onChange={playerSelected}
            onFocus={keyboardUp}
            onBlur={keyboardDown}
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
                    className={"gameTextFields"}
                    ref={autoCompInput}
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