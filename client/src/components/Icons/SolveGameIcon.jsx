import { useContext } from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MainContext from "../../context/MainContext";

const SolveGameIcon = () => {
    const { setShowSolveDialog } = useContext(MainContext);

    return (
        <div 
            className={"solveGameContainer"}
            onClick={() => setShowSolveDialog(true)}
            title={"Solve Game"}
        >
            <LightbulbIcon />
        </div>
    )
};

export default SolveGameIcon;