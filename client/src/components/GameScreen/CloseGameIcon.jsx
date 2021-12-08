import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const CloseGameIcon = ({ reset }) => {
    return (
        <div 
            className={"closeGameContainer"}
            onClick={() => reset("GAME_CHOICE")}
        >
            <CloseIcon />
        </div>
    );
};

export default CloseGameIcon;