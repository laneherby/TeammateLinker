import { useState } from 'react';

const useStopwatch = () => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, ms: 0 });
    const [timerInterval, setTimerInterval] = useState(null);

    const startTimer = () => {
        const startTime = Date.now();

        setTimerInterval(setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            let newTime = {
                hours: parseInt((elapsedTime / 3600000) % 24),
                minutes: parseInt((elapsedTime / 60000) % 60),
                seconds: parseInt((elapsedTime / 1000) % 60),
                ms: parseInt((elapsedTime % 1000) / 10)
            };

            for (let key in newTime) {
            if (newTime[key] < 10) newTime[key] = `0${newTime[key]}`;
            }
            setTime(newTime);
        }, 100));
    };

    const stopTimer = () => {        
        clearInterval(timerInterval);
        setTimerInterval(timerInterval);
    };

    return { time, startTimer, stopTimer };
};

export default useStopwatch;