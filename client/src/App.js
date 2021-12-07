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
  const isMobile = useMobileCheck();

  const nelsonCruz = {"_id":"/players/c/cruzne02.shtml","url":"/players/c/cruzne02.shtml","name":"Nelson Cruz","image":"https://www.baseball-reference.com/req/202108020/images/headshots/f/fea2f131_mlbam.jpg","teams":[{"name":"MIL","years":[2005]},{"name":"TEX","years":[2006,2007,2008,2009,2010,2011,2012,2013]},{"name":"BAL","years":[2014]},{"name":"SEA","years":[2015,2016,2017,2018]},{"name":"MIN","years":[2019,2020,2021]},{"name":"TBR","years":[2021]}]};

  const resetGame = () => {
    setStartPlayer("");
    setEndPlayer("");
    setGameSelected(false);
    setGameStarted(false);
    setGameWon(false);
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
    //console.log(`I started the game with ${startPlayer.name} and ${endPlayer.name}`);
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

  const theGameWasWon = (history) => {
    history.push(endPlayer);
    setWinningTeam(history);
    setGameWon(true);
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
        gameSelected === 'r' &&   
        !gameWon &&
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
        gameSelected === 's' &&    
        !gameWon &&  
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
          gameWon={theGameWasWon}
          resetGame={resetGame}
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
