import React from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const SolveGameIcon = ({ openSolveDialog }) => {
    return (
        <div 
            className={"solveGameContainer"}
            onClick={openSolveDialog}
            title={"Solve Game"}
        >
            <LightbulbIcon />
        </div>
    )
};

export default SolveGameIcon;