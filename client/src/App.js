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

  const [winningTeam, setWinningTeam] = useState([]);
  
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
        return <GameWon />;
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
