import React, { useState } from "react";

const UserTimeForm = ({ setUserPreferences }) => {
  const [preferUnfilledCinema, setPreferUnfilledCinema] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserPreferences({ date, startTime, endTime, preferUnfilledCinema });
  };

  return (
    <form className="flex flex-col items-center mb-5" onSubmit={handleSubmit}>
      <label htmlFor="date">
        Date:
        <input
          id="date"
          className="input"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          required
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <label htmlFor="start-time">
        Start Time:
        <input
          id="start-time"
          className="input"
          type="time"
          value={startTime}
          required
          onChange={(event) => setStartTime(event.target.value)}
        />
      </label>
      <label htmlFor="end-time">
        End Time:
        <input
          id="end-time"
          className="input"
          type="time"
          value={endTime}
          disabled={!startTime}
          min={startTime}
          required
          onChange={(event) => setEndTime(event.target.value)}
        />
      </label>
      <label htmlFor="prefer-unfilled-cinema">
        <input
          id="prefer-unfilled-cinema"
          className="m-2 w-4 h-4"
          type="checkbox"
          checked={preferUnfilledCinema}
          onChange={() => setPreferUnfilledCinema(!preferUnfilledCinema)}
        />
        Prefer an unfilled session?
      </label>
      <button className="btn-primary" type="submit">
        Select free time
      </button>
    </form>
  );
};

export default UserTimeForm;
