import { useContext, useState, useEffect } from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MainContext from "../../context/MainContext";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const SolveGameIcon = () => {
    const { setShowSolveDialog, startPlayer, endPlayer } = useContext(MainContext);
    const [fetchURL, setFetchURL] = useState("");
    const [postBody, setPostBody] = useState(null);
    const { data } = useAxiosFetch(fetchURL, "POST", postBody);

    useEffect(() => {
        if(postBody != null) setFetchURL("/api/solvegame");
    }, [postBody])

    const trySolveGame = () => {
        setPostBody({
            "startPlayer": startPlayer,
            "endPlayer": endPlayer,
        });
    };

    return (
        <div 
            className={"solveGameContainer"}
            // onClick={() => setShowSolveDialog(true)}
            onClick={() => trySolveGame()}
            title={"Solve Game"}
        >
            <LightbulbIcon />
        </div>
    )
};

export default SolveGameIcon;