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
    const [startTime, setStartTime] = useState(null);
    const [totalSecondsPlayed, setTotalSecondsPlayed] = useState(0);
    const [playTime, setPlayTime] = useState({});

    const { time, startTimer, stopTimer } = useStopwatch();

    useEffect(() => {
      setSelectedPlayer(startPlayer);
    }, [startPlayer]);

    const convertSecondsToStopwatch = (seconds) => {
      seconds = Number(seconds);
      let m = Math.floor(seconds / 60);
      let s = Math.floor(seconds % 3600 % 60);
      const ms = (seconds % 1).toFixed(2);

      m = (m < 10) ? "0" + m : m;
      s = (s < 10) ? "0" + s : s;

      const displayTime = {
          "minutes": m,
          "seconds": s,
          "ms": ms.split(".")[1]
      };
      return displayTime;
    };

    // const solveGame = async () => {
    //   const playerLinks = (await axios.get(`/api/solve?startPlayer=${startPlayer._id.substring(startPlayer._id.lastIndexOf("/")+1, startPlayer._id.lastIndexOf("."))}&endPlayer=${endPlayer._id.substring(endPlayer._id.lastIndexOf("/")+1, endPlayer._id.lastIndexOf("."))}`)).data;    
    //   return playerLinks;
    // };
  
    // const isGameSolvable = async () => {
    //   const solvedData = await solveGame();
    //   if(solvedData.length === 1 && solvedData[0] === "NO ANSWERS") return false;
  
    //   return true;
    // };

    const changeGameStateCtx = async (state, history) => {
        switch (state) {
          case states.GAME_CHOICE:
            selectionHistory.setValue([]);
            setStartPlayer("");
            setEndPlayer("");
            setWinningTeam([]);
            break;
          case states.GAME_STARTED:
            // const solvable = await isGameSolvable();
            setStartTime(new Date());
            break;
          case states.GAME_WON:
            const timeDiff = new Date() - startTime;
            const seconds = timeDiff/1000;
            setTotalSecondsPlayed(seconds);            
            setPlayTime(convertSecondsToStopwatch(seconds));
            history.push(endPlayer);
            break;
          case states.GAME_SOLVED: 
            // const solvedTeam = await solveGame();
            // setWinningTeam(solvedTeam);
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
            time, startTimer, stopTimer,
            totalSecondsPlayed, playTime, convertSecondsToStopwatch
        }}>
            {children}
        </MainContext.Provider>
    )
};

export default MainContext;