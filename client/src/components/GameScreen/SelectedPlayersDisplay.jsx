import { useContext } from 'react';
import { Box } from '@mui/material';
import PlayerDisplay from './PlayerDisplay';
import MainContext from '../../context/MainContext';

const SelectedPlayersDisplay = () => {
    const {
        selectedPlayer, startPlayer, endPlayer, isMobile
    } = useContext(MainContext);

    const renderDisplay = () => {
        if(isMobile) {
            return <Box className={"mobileSelectionsContainer"}>
                <Box className={"tablePlayerContainer"}>
                    <Box className={"mobilePlayersChild"}>
                        <span>
                            Start:
                        </span> 
                        <span>
                            {startPlayer.name}
                        </span>
                    </Box>
                    <Box className={"mobilePlayersChild"}>
                        <span>
                            Selected:
                        </span> 
                        <span>
                            {selectedPlayer.name}
                        </span>
                    </Box>
                    <Box className={"mobilePlayersChild"}>
                        <span>
                            End:
                        </span> 
                        <span>
                            {endPlayer.name}
                        </span>
                    </Box>
                </Box>
            </Box>;
        }
        else {
            return <Box className={"selectionsContainer"}>
                <PlayerDisplay
                    topText={"Start Player"}
                    playerImage={startPlayer.image}
                    playerName={startPlayer.name}
                />
                <PlayerDisplay
                    topText={"Selected Player"}
                    playerImage={selectedPlayer.image}
                    playerName={selectedPlayer.name}
                />
                <PlayerDisplay
                    topText={"End Player"}
                    playerImage={endPlayer.image}
                    playerName={endPlayer.name}
                />
            </Box>;
        }
    };

    return (        
        renderDisplay()
    );
};

export default SelectedPlayersDisplay;