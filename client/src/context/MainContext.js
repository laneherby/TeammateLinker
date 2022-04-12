import { createContext, useState, useEffect } from 'react';
import useMobileCheck from  '../hooks/useMobileCheck';
import useStopwatch from '../hooks/useStopwatch';
import useArray from '../hooks/useArray';

const MainContext = createContext({});

export const DataProvider = ({ children }) => {
    const states = {
        GAME_CHOICE: "GAME_CHOICE",
        RANDOM_GAME_SELECTED: "RANDOM_GAME_SELECTED",
        USER_GAME_SELECTED: "USER_GAME_SELECTED",
        GAME_STARTED: "GAME_STARTED",
        GAME_WON: "GAME_WON",
        GAME_SOLVED: "GAME_SOLVED"
    };   

    const isMobile = useMobileCheck();
    const [gameState, setGameState] = useState(states.GAME_CHOICE);
    const [startPlayer, setStartPlayer] = useState("");
    const [endPlayer, setEndPlayer] = useState("");
    const [winningTeam, setWinningTeam] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [numMoves, setNumMoves] = useState(0);
    const selectionHistory = useArray([]);
    const [showAlreadySelectedDialog, setshowAlreadySelectedDialog] = useState(false);
    const [errorPlayerName, setErrorPlayerName] = useState("");
    const [showSolveDialog, setShowSolveDialog] = useState(false);

    const { time, startTimer, stopTimer } = useStopwatch();

    useEffect(() => {
      setSelectedPlayer(startPlayer);
    }, [startPlayer]);

    const changeGameStateCtx = async (state, history) => {
        switch (state) {
          case states.GAME_CHOICE:
            setStartPlayer("");
            setEndPlayer("");
            setWinningTeam([]);
            break;
          case states.GAME_STARTED:
            // const solvable = await isGameSolvable();
            break;
          case states.GAME_WON:
            history.push(endPlayer);
            // getHighScores();
            // setUserScore(score);
            break;
          case states.GAME_SOLVED: 
            //const solvedTeam = await solveGame();
            //setWinningTeam(solvedTeam);
            break;
          default:
            break;
        }
    
        setGameState(state);
      };

    const goBackInHistoryToPlayer = (playerID) => {
        let copyHistory = [...selectionHistory.value];
        const indexOfSelected = selectionHistory.value.findIndex(p => p._id === playerID);
        copyHistory.length = indexOfSelected;
        setSelectedPlayer(selectionHistory.value[indexOfSelected]);
        selectionHistory.setValue(copyHistory);
        setNumMoves(numMoves + 1);
    };

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

    const convertStopwatchToSeconds = (time) => {
        const hourSeconds = parseInt(time.hours) * 3600;
        const minuteSeconds = parseInt(time.minutes) * 60;
        const seconds = parseInt(time.seconds);
        const msSeconds = parseInt(time.ms) / 1000;

        return hourSeconds + minuteSeconds + seconds + msSeconds;
    };

    return (
        <MainContext.Provider value={{
            isMobile, states,
            gameState, setGameState, changeGameStateCtx,
            startPlayer, setStartPlayer,
            endPlayer, setEndPlayer,
            selectedPlayer, setSelectedPlayer,
            winningTeam, setWinningTeam,
            selectionHistory,
            numMoves, setNumMoves,
            goBackInHistoryToPlayer, changeSelectedPlayer,
            showSolveDialog, setShowSolveDialog,
            showAlreadySelectedDialog, setshowAlreadySelectedDialog,
            errorPlayerName, setErrorPlayerName,
            time, startTimer, stopTimer, convertStopwatchToSeconds
        }}>
            {children}
        </MainContext.Provider>
    )
};

export default MainContext;