import React from "react";
import Confetti from 'react-confetti';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useWindowDimensions from '../../hooks/useWindowDimensions'

const GameWon = ({ resetGame }) => {
    const { width, height } = useWindowDimensions();

    return (
        <React.Fragment>
            <Confetti
                width={width}
                height={height}
            />
            
            <Box className={"gameWonContainer"}>
                <Box className={"gameWonText"}>
                    YOU WON!
                </Box>
                <Box>
                    <Button 
                        variant="contained"
                        className={"startButton playAgainButton glossyButtons"}
                        onClick={resetGame}
                    >
                        PLAY AGAIN
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default GameWon;