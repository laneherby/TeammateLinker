import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackArrow = ({ goBack }) => {
    return (
        <div 
            className={"backArrowContainer"}
            onClick={() => goBack("GAME_CHOICE")}    
        >
            <ArrowBackIcon />
        </div>
    );
};

export default GoBackArrow;