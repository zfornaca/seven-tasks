import React, { useState } from "react";

const ONE_WAY_FLIGHT = 'one-way flight';
const RETURN_FLIGHT = 'return flight';
const DEFAULT_DATE = '27.03.2014';

const FlightBooker = (props) => {
  const [flightType, setFlightType] = useState(ONE_WAY_FLIGHT);
  const [dateStringOne, setDateStringOne] = useState(DEFAULT_DATE);
  const [dateStringTwo, setDateStringTwo] = useState(DEFAULT_DATE);
  const [dateOneValid, setDateOneValid] = useState(true);
  const [dateTwoValid, setDateTwoValid] = useState(true);

  /*
    Returns an object with three numbers extracted from dateString, or returns null if dateString
    cannot be properly parsed. Accepts numbers separated by . or by other single character separators.
    Example non-null return value: {day: 27, month: 2, year: 2014}
  */
  function getDateFromString(dateString) {
    const regex = /^([\d]{2}).([\d]{2}).([\d]{4})$/;
    const matchedDate = dateString.match(regex);
    if (matchedDate?.length !== 4) {
      return null;
    }

    const day = +matchedDate[1];
    const month = +matchedDate[2] - 1;
    const year = +matchedDate[3];

    return {day, month, year};
  }

  function isValidDate(dateString) {
    const dateNumbers = getDateFromString(dateString);
    if (dateNumbers == null) {
      return false;
    }
    
    const testDate = new Date(dateNumbers.year, dateNumbers.month, dateNumbers.day);
    
    // Filter out dates that the Date constructor accepts but which aren't real (e.g. February 30)
    if (testDate.getFullYear() === dateNumbers.year && testDate.getMonth() === dateNumbers.month && testDate.getDate() === dateNumbers.day) {
      return true;
    }
    return false;
  }

  const isValidSubmission = () => {
    if (!dateOneValid) return false;
    if (flightType === ONE_WAY_FLIGHT) return true;
    if (!dateTwoValid) return false;
    const dateOneNumbers = getDateFromString(dateStringOne);
    const dateTwoNumbers = getDateFromString(dateStringTwo);
    const dateOne = new Date(dateOneNumbers.year, dateOneNumbers.month, dateOneNumbers.day);
    const dateTwo = new Date(dateTwoNumbers.year, dateTwoNumbers.month, dateTwoNumbers.day);
    return dateOne.getTime() <= dateTwo.getTime();
  }

  function changeDateString(evt, isReturnDate) {
    const dateString = evt.target.value;
    !isReturnDate ? setDateStringOne(dateString) : setDateStringTwo(dateString);
    !isReturnDate ? setDateOneValid(isValidDate(dateString)) : setDateTwoValid(isValidDate(dateString));
  }

  function handleClick() {
    const suffix = (flightType === ONE_WAY_FLIGHT)
      ? `for ${dateStringOne}`
      : `from ${dateStringOne} to ${dateStringTwo}`
    alert(`You have booked a ${flightType} ${suffix}`);
  }

  return <div className="card-column">
    <select className="card-column-element" value={flightType} onChange={(evt) => setFlightType(evt.target.value)}>
      <option value={ONE_WAY_FLIGHT}>{ONE_WAY_FLIGHT}</option>
      <option value={RETURN_FLIGHT}>{RETURN_FLIGHT}</option>
    </select>
    <input value={dateStringOne} onChange={(evt) => changeDateString(evt, false)}
      className={`card-column-element ${dateOneValid ? "" : "input-invalid"}`} />
    <input value={dateStringTwo} onChange={(evt) => changeDateString(evt, true)}
      disabled={flightType === ONE_WAY_FLIGHT}
      className={`card-column-element ${dateTwoValid || flightType === ONE_WAY_FLIGHT ? "" : "input-invalid"}`} />
    <button className="card-column-element" disabled={!isValidSubmission()} onClick={handleClick}>Book</button>
  </div>
}

export default FlightBooker;