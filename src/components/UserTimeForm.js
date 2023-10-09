import React, { useState } from "react";

const UserTimeForm = ({ setUserTime }) => {
  const [preferUnfilledCinema, setPreferUnfilledCinema] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserTime({ startTime, endTime, preferUnfilledCinema });
  };

  return (
    <form className="flex items-center flex-col mb-5" onSubmit={handleSubmit}>
      <label>
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
      <label>
        End Time:
        <input
          id="end-time"
          className="input"
          type="time"
          value={endTime}
          required
          min={startTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </label>
      <label>
        <input
          className="m-2 w-4 h-4"
          type="checkbox"
          value={preferUnfilledCinema}
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
