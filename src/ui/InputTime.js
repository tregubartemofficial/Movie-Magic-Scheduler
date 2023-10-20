import React, { useState } from "react";
import { formatTimeToMin } from "../App";
import "../styles/Input.css";

const InputTime = ({ userPreferences, setUserPreferences, type }) => {
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState(false);

  const handleTime = (event) => {
    if (
      type === "startTime" &&
      formatTimeToMin(event.target.value) >
        formatTimeToMin(userPreferences.endTime)
    ) {
      setTimeError(true);
      setTime('');
      return;
    }
    if (
      type === "endTime" &&
      formatTimeToMin(event.target.value) <
        formatTimeToMin(userPreferences.startTime)
    ) {
      setTimeError(true);
      setTime("");
      return;
    }
    setTimeError(false);
    setTime(event.target.value);
    setUserPreferences((prev) => ({
      ...prev,
      [type]: event.target.value,
    }));
  };

  return (
    <label htmlFor={`${type}`} className="label">
      Enter your preferred {type === "startTime" ? "start" : "end"} time for the
      movie:
      <input
        id={`${type}`}
        className={`${timeError ? "input-error" : ""} input`}
        type="time"
        value={time}
        max={type === "startTime" ? userPreferences.endTime : "23:59"}
        min={type === "startTime" ? "00:00" : userPreferences.startTime}
        onChange={(event) => handleTime(event)}
      />
      {timeError && <p className="text-error">Incorrect time</p>}
    </label>
  );
};

export default InputTime;
