import { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TeamScroller from './TeamScroller';
import StatusDisplay from './StatusDisplay';
import { PlayerAlreadySelectedDialog, AskSolveDialog } from '../Dialogs';
import SelectedPlayersDisplay from './SelectedPlayersDisplay';
import { CloseGameIcon, SolveGameIcon } from '../Icons';
import MainContext from '../../context/MainContext';

const GameScreen = () => {
    const {
        states, changeGameStateCtx, selectionHistory, selectedPlayer,
        endPlayer, numMoves, time, showAlreadySelectedDialog, showSolveDialog
    } = useContext(MainContext);

    useEffect(() => {
        const historyLength = selectionHistory.value.length;
        
        if((historyLength > 0) && (selectedPlayer._id === endPlayer._id)) {
            changeGameStateCtx(states.GAME_WON, selectionHistory.value, {"time": time, "moves": numMoves});
        }
        // eslint-disable-next-line
    }, [selectionHistory]);

    return (
        <Box className={"gameScreenContainer"}>
            <CloseGameIcon />
            <SolveGameIcon />
            <AskSolveDialog open={showSolveDialog} />
            <PlayerAlreadySelectedDialog open={showAlreadySelectedDialog} />
            <SelectedPlayersDisplay/>
            <StatusDisplay />
            <TeamScroller />
        </Box>
    );
};

export default GameScreen;