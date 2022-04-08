import { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MainContext from "../../context/MainContext";

const CloseGameIcon = () => {
    const { states, changeGameStateCtx } = useContext(MainContext);

    return (
        <div 
            className={"closeGameContainer"}
            onClick={() => changeGameStateCtx(states.GAME_CHOICE)}
            title={"Close Game"}
        >
            <CloseIcon />
        </div>
    );
};

export default CloseGameIcon;