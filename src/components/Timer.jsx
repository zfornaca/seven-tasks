import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const INITIAL_DURATION = 10000;

const Timer = () => {
  const [duration, setDuration] = useState(INITIAL_DURATION);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const tick = () => setProgress(progress + 100);
    const interval = setInterval(tick, 100)
    return () => clearInterval(interval);
  }, [progress]);

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