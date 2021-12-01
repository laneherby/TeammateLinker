import React, { useState } from 'react';
import { Container } from '@mui/material';
import './styles/App.css';
import ChooseGame from './components/TitleScreen/ChooseGame';
import CreateRandomGame from './components/TitleScreen/CreateRandomGame';
import CreateUserGame from './components/TitleScreen/CreateUserGame';
import GameScreen from './components/GameScreen/GameScreen';
import axios from 'axios';

const App = () => {
  const [startPlayer, setStartPlayer] = useState("");
  const [endPlayer, setEndPlayer] = useState("");
  const [gameSelected, setGameSelected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const nelsonCruz = {"_id":"/players/c/cruzne02.shtml","url":"/players/c/cruzne02.shtml","name":"Nelson Cruz","image":"https://www.baseball-reference.com/req/202108020/images/headshots/f/fea2f131_mlbam.jpg","teams":[{"name":"MIL","years":[2005]},{"name":"TEX","years":[2006,2007,2008,2009,2010,2011,2012,2013]},{"name":"BAL","years":[2014]},{"name":"SEA","years":[2015,2016,2017,2018]},{"name":"MIN","years":[2019,2020,2021]},{"name":"TBR","years":[2021]}]}

  const rollPlayers = (startYear, endYear) => {
    axios.get(`/api/gettwoplayers?startYear=${startYear}&endYear=${endYear}`).then((res) => {
      setStartPlayer(res.data[0]);
      setEndPlayer(res.data[1]);
    });
  };

  const setGameType = (gameType) => {
    setGameSelected(gameType);
  };

  const startTheGame = () => {
    //console.log(`I started the game with ${startPlayer.name} and ${endPlayer.name}`);
    setStartPlayer(nelsonCruz);
    setGameStarted(true);
  };

  const goBackToGameSelection = () => {
    setGameSelected(false);
    setGameStarted(false);
  };

  return (
    <Container
      sx={{
        minHeight:'100vh',        
        maxWidth: "90vw!important",
      }}
    >
      {/* {
        !gameSelected &&
        !gameStarted &&
        <ChooseGame setGameType={setGameType} />
      }

      {
        !gameStarted &&
        gameSelected === 'r' &&   
        <CreateRandomGame 
          rollPlayers={rollPlayers} 
          startPlayer={startPlayer} 
          endPlayer={endPlayer}
          startTheGame={startTheGame}
          goBack={goBackToGameSelection}
        />
      } */}

      <CreateUserGame
        startPlayer={startPlayer}
        endPlayer={endPlayer}
        startTheGame={startTheGame}
        goBack={goBackToGameSelection}
      />
      
      {gameStarted &&
        <GameScreen 
          startPlayer={startPlayer}
          endPlayer={endPlayer}
        />
      }
    </Container>
  );
}

export default App;
