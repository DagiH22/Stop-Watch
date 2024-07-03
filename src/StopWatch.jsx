import { useEffect, useState, useRef } from "react";
import './stopwatch.css'

function StopWatch() {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [milliseconds, setMilliseconds] = useState('00');
    const [running, setRunning] = useState(false);
    const [elapsedtime, setElapsedtime] = useState(0);
    const [starttime, setStartTime] = useState(0);
    const timer = useRef(null);
    const lapDisplay = useRef(null);

    useEffect(() => {
        if (running) {
            timer.current = setInterval(update, 10);
            return () => clearInterval(timer.current);
        }
    }, [running]);

    function start() {
        if (!running) {
            setStartTime(Date.now() - elapsedtime);
            setRunning(true);
        }
    }
    function pause() {
        if (running) {
            setRunning(false);
            clearInterval(timer.current);
        }
    }
    function reset() {
        setRunning(false);
        setElapsedtime(0);
        setStartTime(0);
        setHours('00');
        setMinutes('00');
        setSeconds('00');
        setMilliseconds('00');
        clearInterval(timer.current);
        if (lapDisplay.current) {
            lapDisplay.current.innerHTML = "";
        }
    }      
    function lap() {
        let lap = lapDisplay.current
        if (lap) {
            lap.innerHTML += `${hours}:${minutes}:${seconds}:${milliseconds}<br>`;
            lap.scrollTop = lap.scrollHeight;
        }
    } 
    function update() {
        const currentTime = Date.now();
        const newElapsedtime = currentTime - starttime;
        setElapsedtime(newElapsedtime);

        const hour = Math.floor(newElapsedtime / (1000 * 60 * 60));
        const minute = Math.floor((newElapsedtime % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((newElapsedtime % (1000 * 60)) / 1000);
        const millisecond = Math.floor((newElapsedtime % 1000) / 10);

        setHours(String(hour).padStart(2, "0"));
        setMinutes(String(minute).padStart(2, "0"));
        setSeconds(String(second).padStart(2, "0"));
        setMilliseconds(String(millisecond).padStart(2, "0"));
    }
    return (
        <>
            <div id="container">
                <h1>StopWatch</h1>
                <div className="display">
                    {hours}:{minutes}:{seconds}:{milliseconds}
                </div>
                <div className="buttons">
                    <button className="start" onClick={start}>Start</button>
                    <button className="stop" onClick={pause}>Pause</button>
                    <button className="reset" onClick={reset}>Reset</button>
                    <button className="lap" onClick={lap}>Lap</button>
                </div>
            </div>
                <div className="lapDisplay" ref={lapDisplay}></div>
        </>
    );
}

export default StopWatch;
