import { useContext } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainContext from "../../context/MainContext";

const GoBackArrow = () => {
    const { states, changeGameStateCtx } = useContext(MainContext);

    return (
        <div 
            className={"backArrowContainer"}
            onClick={() => changeGameStateCtx(states.GAME_CHOICE)}
            title={"Go Back"}
        >
            <ArrowBackIcon />
        </div>
    );
};

export default GoBackArrow;