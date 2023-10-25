import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserEndTime, setUserStartTime } from "../redux/calendarSlice";
import { formatTimeToMin } from "../App";
import "../styles/Input.css";

const InputTime = ({ type }) => {
  const dispatch = useDispatch();
  const { endTime, startTime } = useSelector((state) => state.calendar);
  const [timeError, setTimeError] = useState(false);

  const handleTime = (event) => {
    if (
      type === "startTime" &&
      formatTimeToMin(event.target.value) > formatTimeToMin(endTime)
    ) {
      setTimeError(true);
      dispatch(setUserStartTime(""));
      return;
    }
    if (
      type === "endTime" &&
      formatTimeToMin(event.target.value) < formatTimeToMin(startTime)
    ) {
      setTimeError(true);
      dispatch(setUserEndTime(""));
      return;
    }
    setTimeError(false);
    type === "startTime"
      ? dispatch(setUserStartTime(event.target.value))
      : dispatch(setUserEndTime(event.target.value));
  };

  return (
    <label htmlFor={`${type}`} className="label">
      Enter your preferred {type === "startTime" ? "start" : "end"} time for the
      movie:
      <input
        id={`${type}`}
        className={`${timeError ? "input-error" : ""} input`}
        type="time"
        value={type === "startTime" ? startTime : endTime}
        max={type === "startTime" ? endTime : "23:59"}
        min={type === "startTime" ? "00:00" : startTime}
        onChange={(event) => handleTime(event)}
      />
      {timeError && <p className="text-error">Incorrect time</p>}
    </label>
  );
};

export default InputTime;
