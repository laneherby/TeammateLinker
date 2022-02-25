import React, { useState, useEffect } from 'react';
import useArray from '../../hooks/useArray';
import Box from '@mui/material/Box';
import TeamScroller from './TeamScroller';
import StatusDisplay from './StatusDisplay';
import { PlayerAlreadySelectedDialog, AskSolveDialog } from '../Dialogs';
import SelectedPlayersDisplay from './SelectedPlayersDisplay';
import { CloseGameIcon, SolveGameIcon } from '../Icons';
import useStopwatch from '../../hooks/useStopwatch';

const GameScreen = ({ startPlayer, endPlayer, winGame, resetGame, solveGame, isMobile }) => {
    const selectionHistory = useArray([]);
    const [numMoves, setNumMoves] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState(startPlayer);
    const [showAlreadySelectedDialog, setshowAlreadySelectedDialog] = useState(false);
    const [errorPlayerName, setErrorPlayerName] = useState("");
    const [showSolveDialog, setShowSolveDialog] = useState(false);
    const { time, startTimer, stopTimer } = useStopwatch();

    const changeSelectedPlayer = (player) => {
        const playerInHistory = (p) => p._id === player._id;

        if(selectedPlayer._id !== player._id && !selectionHistory.value.some(playerInHistory)) {
            selectionHistory.push(selectedPlayer);
            setSelectedPlayer(player);   

            setNumMoves(numMoves + 1);
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
        setNumMoves(numMoves + 1);
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
            winGame("GAME_WON", selectionHistory.value, {"time": time, "moves": numMoves});
        }
        // eslint-disable-next-line
    }, [selectionHistory]);

    return (
        <Box className={"gameScreenContainer"}>
            <CloseGameIcon resetGame={resetGame} />
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
                isMobile={isMobile}
            />
            <StatusDisplay 
                history={selectionHistory.value}
                handleHistoryClick={goBackInHistoryToPlayer}
                numMoves={numMoves}
                isMobile={isMobile}
                startTimer={startTimer}
                time={time}
            />
            <TeamScroller 
                selectedPlayer={selectedPlayer} 
                changeSelectedPlayer={changeSelectedPlayer}
                isMobile={isMobile}
            />
        </Box>
    );
};

export default GameScreen;