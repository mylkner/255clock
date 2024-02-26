import { useState, useEffect, useRef } from "react";
import "./style.css";

const Clock = () => {
    const [lengths, setLengths] = useState({
        breakLength: 5,
        sessionLength: 25,
    });
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(lengths.sessionLength * 60);
    const label = useRef(null);
    const pausePlay = useRef(null);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        if (time === -1 && label.current.innerText === "Session") {
            document.getElementById("beep").play();
            setTime(lengths.breakLength * 60);
            label.current.innerText = "Break";
        } else if (time === -1 && label.current.innerText === "Break") {
            document.getElementById("beep").play();
            setTime(lengths.sessionLength * 60);
            label.current.innerText = "Session";
        } else if (isRunning) {
            const interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [time, isRunning, lengths.sessionLength, lengths.breakLength]);

    const breakDec = ({ breakLength }) => {
        if (breakLength > 1 && !isRunning) {
            setLengths({
                ...lengths,
                breakLength: breakLength - 1,
            });
        }
    };
    const breakInc = ({ breakLength }) => {
        if (breakLength < 60 && !isRunning) {
            setLengths({
                ...lengths,
                breakLength: breakLength + 1,
            });
        }
    };
    const sessionDec = ({ sessionLength }) => {
        if (sessionLength > 1 && !isRunning) {
            setLengths({
                ...lengths,
                sessionLength: sessionLength - 1,
            });
            setTime((sessionLength - 1) * 60);
        }
    };
    const sessionInc = ({ sessionLength }) => {
        if (sessionLength < 60 && !isRunning) {
            setLengths({
                ...lengths,
                sessionLength: sessionLength + 1,
            });
            setTime((sessionLength + 1) * 60);
        }
    };

    const pausePlayFn = () => {
        setIsRunning(!isRunning);

        if (!isRunning) {
            pausePlay.current.className = "fa-solid fa-pause fa-3x";
        } else {
            pausePlay.current.className = "fa-solid fa-play fa-3x";
        }
    };

    const reset = () => {
        setLengths({
            breakLength: 5,
            sessionLength: 25,
        });
        setIsRunning(false);
        setTime(25 * 60);
        label.current.innerText = "Session";
        pausePlay.current.className = "fa-solid fa-play fa-3x";
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
    };

    return (
        <div className="container">
            <h1>25 + 5 Clock</h1>
            <section className="lengths">
                <div className="break div">
                    <p id="break-label">Break Length</p>
                    <span className="btns-length">
                        <button
                            id="break-decrement"
                            onClick={() => breakDec(lengths)}
                        >
                            <i className="fa-solid fa-arrow-down fa-3x"></i>
                        </button>
                        <p id="break-length">{lengths.breakLength}</p>
                        <button
                            id="break-increment"
                            onClick={() => breakInc(lengths)}
                        >
                            <i className="fa-solid fa-arrow-up fa-3x"></i>
                        </button>
                    </span>
                </div>

                <div className="session div">
                    <p id="session-label">Session Length</p>
                    <span className="btns-length">
                        <button
                            id="session-decrement"
                            onClick={() => sessionDec(lengths)}
                        >
                            <i className="fa-solid fa-arrow-down fa-3x"></i>
                        </button>
                        <p id="session-length">{lengths.sessionLength}</p>
                        <button
                            id="session-increment"
                            onClick={() => sessionInc(lengths)}
                        >
                            <i className="fa-solid fa-arrow-up fa-3x"></i>
                        </button>
                    </span>
                </div>
            </section>
            <div className="timer">
                <div className="timer-label-time-left">
                    <p id="timer-label" ref={label}>
                        Session
                    </p>
                    <p id="time-left">
                        {minutes < 10 && 0}
                        {minutes}:{seconds < 10 && 0}
                        {seconds}
                    </p>
                </div>
                <span className="timer-btns">
                    <button id="start_stop" onClick={() => pausePlayFn()}>
                        <i
                            className="fa-solid fa-play fa-3x"
                            ref={pausePlay}
                        ></i>
                    </button>
                    <button id="reset" onClick={() => reset()}>
                        <i className="fa-solid fa-arrows-rotate fa-3x"></i>
                    </button>
                </span>
            </div>
            <audio
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
        </div>
    );
};

export default Clock;
