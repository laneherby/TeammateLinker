import React, { useState, useEffect } from 'react';
import useArray from '../../hooks/useArray';
import { Box } from '@mui/material';
import TeamScroller from './TeamScroller';
import SelectionHistory from './SelectionHistory';
import PlayerAlreadySelectedDialog from './PlayerAlreadySelectedDialog';
import SelectedPlayersDisplay from './SelectedPlayersDisplay';

const GameScreen = ({ startPlayer, endPlayer, gameWon }) => {
    const selectionHistory = useArray([]);
    const [selectedPlayer, setSelectedPlayer] = useState(startPlayer);
    const [showAlreadySelectedDialog, setshowAlreadySelectedDialog] = useState(false);
    const [errorPlayerName, setErrorPlayerName] = useState("");

    const changeSelectedPlayer = (player) => {
        if (player._id === endPlayer._id){
            gameWon();
            return;
        }

        const playerInHistory = (p) => p._id === player._id;

        if(selectedPlayer._id !== player._id && !selectionHistory.value.some(playerInHistory)) {
            selectionHistory.push(selectedPlayer);
            setSelectedPlayer(player);   
        }
        else {
            setErrorPlayerName(player.name);
            setshowAlreadySelectedDialog(true);
        }
    };

    const goBackInHistoryToPlayer = (playerID) => {
        let copyHistory = [...selectionHistory.value];
        const indexOfSelected = selectionHistory.value.findIndex(p => p._id === playerID);
        copyHistory.length = indexOfSelected;
        setSelectedPlayer(selectionHistory.value[indexOfSelected]);
        selectionHistory.setValue(copyHistory);
    };

    const closeAlreadySelectedDialog = () => {
        setshowAlreadySelectedDialog(false);
    }

    useEffect(() => {
        
    }, [selectionHistory]);

    return (
        <Box className={"gameScreenContainer"}>
            {
                showAlreadySelectedDialog &&
                <PlayerAlreadySelectedDialog open={showAlreadySelectedDialog} player={errorPlayerName} closeDialog={closeAlreadySelectedDialog} />
            }
            <SelectedPlayersDisplay 
                currPlayer={selectedPlayer} 
                startPlayer={startPlayer}
                endPlayer={endPlayer}
            />
            <SelectionHistory 
                history={selectionHistory.value} 
                handleHistoryClick={goBackInHistoryToPlayer} 
            />
            <TeamScroller 
                selectedPlayer={selectedPlayer} 
                changeSelectedPlayer={changeSelectedPlayer} 
            />
        </Box>
    );
};

export default GameScreen;