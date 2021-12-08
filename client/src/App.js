import React, { useState } from 'react';
import { Container } from '@mui/material';
import './styles/App.css';
import ChooseGame from './components/TitleScreen/ChooseGame';
import CreateRandomGame from './components/TitleScreen/CreateRandomGame';
import CreateUserGame from './components/TitleScreen/CreateUserGame';
import GameScreen from './components/GameScreen/GameScreen';
import GameWon from './components/EndScreen/GameWon';
import useMobileCheck from  './hooks/useMobileCheck';
import axios from 'axios';

const GAME_CHOICE = "GAME_CHOICE";
const RANDOM_GAME_SELECTED = "RANDOM_GAME_SELECTED";
const USER_GAME_SELECTED = "USER_GAME_SELECTED";
const GAME_STARTED = "GAME_STARTED";
const GAME_WON = "GAME_WON";
const GAME_SOLVED = "GAME_SOLVED";

const App = () => {  
  const [gameState, setGameState] = useState(GAME_CHOICE);
  const [startPlayer, setStartPlayer] = useState("");
  const [endPlayer, setEndPlayer] = useState("");
  const [winningTeam, setWinningTeam] = useState([]);
  
  const isMobile = useMobileCheck();

  const userSetPlayer = (player, type) => {
    console.log(player);
    if(type === "start") setStartPlayer(player);
    if(type === "end") setEndPlayer(player);
  };

  const changeGameState = (state, history) => {
    setGameState(state);
    switch (state) {
      case GAME_CHOICE:
        setStartPlayer("");
        setEndPlayer("");
        setWinningTeam([]);
        break;
      case GAME_WON:
        history.push(endPlayer);
        setWinningTeam(history);
        break;
      case GAME_SOLVED: 
          axios.get(`/api/solve?startPlayer=${startPlayer._id.substring(startPlayer._id.lastIndexOf("/")+1, startPlayer._id.lastIndexOf("."))}&endPlayer=${endPlayer._id.substring(endPlayer._id.lastIndexOf("/")+1, endPlayer._id.lastIndexOf("."))}`).then((res) => {
            console.log(res.data);
          });
        break;
      default:
        break;
    }
  };

  const rollPlayers = (startYear, endYear) => {
    axios.get(`/api/gettwoplayers?startYear=${startYear}&endYear=${endYear}`).then((res) => {
      setStartPlayer(res.data[0]);
      setEndPlayer(res.data[1]);
    });
  };
  
  const renderGameState = () => {
    switch(gameState) {
      case GAME_CHOICE:
        return <ChooseGame setGameType={changeGameState} />;
      case RANDOM_GAME_SELECTED:
        return <CreateRandomGame 
          rollPlayers={rollPlayers} 
          startPlayer={startPlayer} 
          endPlayer={endPlayer}
          startTheGame={changeGameState}
          goBack={changeGameState}
        />;
      case USER_GAME_SELECTED:
        return <CreateUserGame
          startPlayer={startPlayer}
          endPlayer={endPlayer}
          userSetPlayer={userSetPlayer}
          startTheGame={changeGameState}
          goBack={changeGameState}
        />;
      case GAME_STARTED:
        return <GameScreen 
          startPlayer={startPlayer}
          endPlayer={endPlayer}
          winGame={changeGameState}
          resetGame={changeGameState}
          solveGame={changeGameState}
        />;
      case GAME_WON:
        return <GameWon resetGame={changeGameState} winningTeam={winningTeam} />;
      default:
        break;
    }
  };

  return (
    <Container
      sx={{
        minHeight:'100vh',        
        maxWidth: "90vw!important",
      }}
    >
     {renderGameState()}
    </Container>
  );
}

export default App;
