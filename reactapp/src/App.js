import React, { useState, useEffect } from 'react';
import './App.css'
function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  
  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);
  
  const startStopToggle = () => {
    setIsRunning((prevState) => !prevState);
  };
  
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  
  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (seconds) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = pad(Math.floor(seconds / 3600));
    const minutes = pad(Math.floor((seconds % 3600) / 60));
    const secs = pad(seconds % 60);
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <div className="time-display">{formatTime(time)}</div>
      <div className="button-container">
        <button onClick={startStopToggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={addLap} disabled={!isRunning}>
          Add Lap
        </button>
      </div>
      <ul className="lap-list">
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stopwatch;
