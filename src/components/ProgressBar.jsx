import React from "react";
import './ProgressBar.scss';

const ProgressBar = ({ progress }) => {
  return <div className="progress-bar">
    <div className="filled" style={{width: `${progress}%`}}/>
  </div>
}

export default ProgressBar;