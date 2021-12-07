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

const App = () => {
  const [startPlayer, setStartPlayer] = useState("");
  const [endPlayer, setEndPlayer] = useState("");
  const [gameSelected, setGameSelected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [winningTeam, setWinningTeam] = useState([]);
  const [gameSolved, setGameSolved] = useState(false);
  const isMobile = useMobileCheck();  

  const resetGame = () => {
    setStartPlayer("");
    setEndPlayer("");
    setGameSelected(false);
    setGameStarted(false);
    setGameWon(false);
    setGameSolved(false);
    setWinningTeam([]);
  };
  
  const setGameType = (gameType) => {
    setGameSelected(gameType);
  };
  
  const rollPlayers = (startYear, endYear) => {
    axios.get(`/api/gettwoplayers?startYear=${startYear}&endYear=${endYear}`).then((res) => {
      setStartPlayer(res.data[0]);
      setEndPlayer(res.data[1]);
    });
  };
  
  const startTheGame = () => {    
    setGameStarted(true);
  };

  const goBackToGameSelection = () => {
    setGameSelected(false);
    setGameStarted(false);
    setStartPlayer("");
    setEndPlayer("");
  };

  const userSetPlayer = (player, type) => {
    if(type === "start") setStartPlayer(player);
    if(type === "end") setEndPlayer(player);
  };

  const winGame = (history) => {
    history.push(endPlayer);
    setWinningTeam(history);
    setGameWon(true);
  };

  const solveGame = () => {
    setGameSolved(true);
    axios.get(`/api/solve?startPlayer=${startPlayer._id.substring(startPlayer._id.lastIndexOf("/")+1, startPlayer._id.lastIndexOf("."))}&endPlayer=${endPlayer._id.substring(endPlayer._id.lastIndexOf("/")+1, endPlayer._id.lastIndexOf("."))}`).then((res) => {
      console.log(res.data);
    })
  };

  return (
    <Container
      sx={{
        minHeight:'100vh',        
        maxWidth: "90vw!important",
      }}
    >
      {
        !gameSelected &&
        !gameStarted &&
        !gameWon &&
        <ChooseGame setGameType={setGameType} />
      }

      {
        !gameStarted &&
        !gameWon &&
        gameSelected === 'r' &&   
        <CreateRandomGame 
          rollPlayers={rollPlayers} 
          startPlayer={startPlayer} 
          endPlayer={endPlayer}
          startTheGame={startTheGame}
          goBack={goBackToGameSelection}
        />
      }

      {
        !gameStarted &&
        !gameWon &&  
        gameSelected === 's' &&
        <CreateUserGame
          startPlayer={startPlayer}
          endPlayer={endPlayer}
          userSetPlayer={userSetPlayer}
          startTheGame={startTheGame}
          goBack={goBackToGameSelection}
        />
      }
      
      {
        !gameWon &&
        gameStarted &&
        <GameScreen 
          startPlayer={startPlayer}
          endPlayer={endPlayer}
          winGame={winGame}
          resetGame={resetGame}
          solveGame={solveGame}
        />
      }

      {
        gameWon &&
        <GameWon 
          resetGame={resetGame}
          winningTeam={winningTeam}
        />
      }
    </Container>
  );
}

export default App;
