import React, { useState, useEffect } from 'react';
import useArray from '../../hooks/useArray';
import { Box } from '@mui/material';
import TeamScroller from './TeamScroller';
import SelectionHistory from './SelectionHistory';
import PlayerAlreadySelectedDialog from './PlayerAlreadySelectedDialog';
import AskSolveDialog from './AskSolveDialog';
import SelectedPlayersDisplay from './SelectedPlayersDisplay';
import CloseGameIcon from './CloseGameIcon';
import SolveGameIcon from './SolveGameIcon';

const GameScreen = ({ startPlayer, endPlayer, winGame, resetGame, solveGame }) => {
    const selectionHistory = useArray([]);
    const [selectedPlayer, setSelectedPlayer] = useState(startPlayer);
    const [showAlreadySelectedDialog, setshowAlreadySelectedDialog] = useState(false);
    const [errorPlayerName, setErrorPlayerName] = useState("");
    const [showSolveDialog, setShowSolveDialog] = useState(false);


    const changeSelectedPlayer = (player) => {
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
    };

    const openSolveDialog = () => {
        setShowSolveDialog(true);
    };

    const closeSolveDialog = () => {
        setShowSolveDialog(false);
    };

    useEffect(() => {
        const historyLength = selectionHistory.value.length;
        
        if((historyLength > 0) && (selectedPlayer._id === endPlayer._id)) {
            winGame("GAME_WON", selectionHistory.value);
        }
        // eslint-disable-next-line
    }, [selectionHistory]);

    return (
        <Box className={"gameScreenContainer"}>
            <CloseGameIcon reset={resetGame} />
            <SolveGameIcon openSolveDialog={openSolveDialog} />

            <AskSolveDialog 
                open={showSolveDialog}
                solveGame={solveGame}
                closeSolveDialog={closeSolveDialog}
            />
            <PlayerAlreadySelectedDialog open={showAlreadySelectedDialog} player={errorPlayerName} closeDialog={closeAlreadySelectedDialog} />

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