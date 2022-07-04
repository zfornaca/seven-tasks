import React, { useState } from "react";
import './Counter.scss';

const Counter = () => {
  const [count, setCount] = useState(0);

  return <div className="card-row">
    <div className="count">{count}</div>
    <button onClick={() => setCount(count+1)}>Count</button>
  </div>
}

export default Counter;