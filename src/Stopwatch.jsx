import { useState, useEffect } from "react";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const startStopHandler = () => {
        setIsRunning(!isRunning);
    };

    const resetHandler = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    const lapHandler = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (time) => {
        const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <div className="stopwatch">
            <h1>Stopwatch</h1>
            <div className="time-display">{formatTime(time)}</div>
            <div className="controls">
                <button onClick={startStopHandler}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={resetHandler} disabled={time === 0}>
                    Reset
                </button>
                <button onClick={lapHandler} disabled={!isRunning}>
                    Lap
                </button>
            </div>
            {laps.length > 0 && (
                <div className="laps">
                    <h2>Lap Times</h2>
                    <ul>
                        {laps.map((lap, index) => (
                            <li key={index}>
                                Lap {index + 1}: {formatTime(lap)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
