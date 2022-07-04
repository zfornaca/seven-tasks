import React, { useState } from "react";

const TempConverter = () => {
  const [tempC, setTempC] = useState(0);
  const [tempF, setTempF] = useState(convertTempToF(tempC));
  const [validC, setValidC] = useState(true);
  const [validF, setValidF] = useState(true);

  function convertTempToF(temp) {
    return temp * (9/5) + 32;
  }

  function convertTempToC(temp) {
    return (temp - 32) * (5/9);
  }

  /*
    Handles an input change value; isC param identifies which input is being updated.
    If the new value is invalid, mark that input as invalid. If valid, calculate other 
    valid temp and mark both inputs as valid.
  */
  function changeTemp(evt, isC) {
    const newTemp = evt.target.value;
    isC ? setTempC(newTemp) : setTempF(newTemp);

    if(isNaN(newTemp)) {
      isC ? setValidC(false) : setValidF(false);
    } else {
      if (isC) {
        setTempF(convertTempToF(newTemp));
      } else {
        setTempC(convertTempToC(newTemp));
      }
      setValidC(true);
      setValidF(true);
    }
  }

  return <div className="card-row">
    <div className="card-row-element">
      <div>Celsius</div>
      <input value={tempC} onChange={(evt) => changeTemp(evt, true)} 
        className={validC ? "" : "input-invalid"} />
    </div>
    <div className="card-row-element">
      <div>Fahrenheit</div>
      <input value={tempF} onChange={(evt) => changeTemp(evt, false)}
        className={validF ? "" : "input-invalid"} />
    </div>
  </div>
}

export default TempConverter;