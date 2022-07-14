import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "./ProgressBar";

const INITIAL_DURATION = 10000;

const Timer = () => {
  const [duration, setDuration] = useState(INITIAL_DURATION);
  const [progress, setProgress] = useState(0);

  // from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (progress < duration) {
      setProgress(Math.min(progress + 100, duration));
    }
  }, 100);

  function handleDurationChange(evt) {
    setDuration(evt.target.value);
  }

  return <div>
    <ProgressBar progress={(progress * 100) / duration}/>
    <div>{`${(progress/1000).toFixed(1)}s`}</div>
    <div className="card-row">
      <input type="range" 
          min="0" max="30000" value={duration} onChange={handleDurationChange} step="1" />
      <button onClick={() => setProgress(0)}>Reset</button>
    </div>
  </div>
}

export default Timer;