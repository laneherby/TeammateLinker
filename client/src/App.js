import React, { useState, useContext } from 'react';
import './styles/App.css';
import { Container } from '@mui/material';
import ChooseGame from './components/TitleScreen/ChooseGame';
import CreateRandomGame from './components/TitleScreen/CreateRandomGame';
import CreateUserGame from './components/TitleScreen/CreateUserGame';
import GameScreen from './components/GameScreen/GameScreen';
import GameWon from './components/EndScreen/GameWon';
import GameSolved from './components/EndScreen/GameSolved';
import MainContext from './context/MainContext';
import axios from 'axios';

const App = () => {
  const { 
    states, gameState
  } = useContext(MainContext);

  const [startPlayer, setStartPlayer] = useState("");
  const [endPlayer, setEndPlayer] = useState("");
  const [winningTeam, setWinningTeam] = useState([]);
  const [gameHighScores, setGameHighScores] = useState({});
  const [userScore, setUserScore] = useState({});

  const solveGame = async () => {
    const playerLinks = (await axios.get(`/api/solve?startPlayer=${startPlayer._id.substring(startPlayer._id.lastIndexOf("/")+1, startPlayer._id.lastIndexOf("."))}&endPlayer=${endPlayer._id.substring(endPlayer._id.lastIndexOf("/")+1, endPlayer._id.lastIndexOf("."))}`)).data;    
    return playerLinks;
  };

  const isGameSolvable = async () => {
    const solvedData = await solveGame();
    if(solvedData.length === 1 && solvedData[0] === "NO ANSWERS") return false;

    return true;
  };

  const getHighScores = async () => {
    const highScoreData = (await axios.get(`/api/checkhighscore?playerOne=${startPlayer._id}&playerTwo=${endPlayer._id}`)).data;
    setGameHighScores(highScoreData);
  }
  
  const renderGameState = () => {
    switch(gameState) {
      case states.GAME_CHOICE:
        return <ChooseGame />;
      case states.RANDOM_GAME_SELECTED:
        return <CreateRandomGame />;
      case states.USER_GAME_SELECTED:
        return <CreateUserGame />;
      case states.GAME_STARTED:
        return <GameScreen />;
      case states.GAME_WON:
        return <GameWon 
          winningTeam={winningTeam}
          highScore={gameHighScores}
          userScore={userScore}
        />;
      case states.GAME_SOLVED:
        return <GameSolved solvedTeam={winningTeam} />;
      default:
        break;
    }
  };

  return (
    <Container className={"appContainer"}>
      {renderGameState()}
    </Container>
  );
}

export default App;
