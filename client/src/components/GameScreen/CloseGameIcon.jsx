import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const CloseGameIcon = ({ resetGame }) => {
    return (
        <div 
            className={"closeGameContainer"}
            onClick={() => resetGame("GAME_CHOICE")}
            title={"Close Game"}
        >
            <CloseIcon />
        </div>
    );
};

export default CloseGameIcon;