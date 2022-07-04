import React from "react";
import './Card.scss';

const Card = (props) => {
  return <div className="card">
    <div className="card-header">
      <div className="card-title">{props.title}</div>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
}

export default Card;