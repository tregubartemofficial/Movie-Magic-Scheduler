import React, { useState } from "react";
import InputTime from "../../ui/InputTime";

const UserTimeForm = ({ userPreferences, setUserPreferences }) => {
  const [preferUnfilledCinema, setPreferUnfilledCinema] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <form className="flex flex-col items-center mb-5">
      <label htmlFor="date" className="label">
        Date:
        <input
          id="date"
          className="input"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
            setUserPreferences((prev) => ({
              ...prev,
              date: event.target.value,
            }));
          }}
        />
      </label>
      <InputTime
        userPreferences={userPreferences}
        setUserPreferences={setUserPreferences}
        type="startTime"
      />
      <InputTime
        userPreferences={userPreferences}
        setUserPreferences={setUserPreferences}
        type="endTime"
      />
      <label htmlFor="prefer-unfilled-cinema" className="cursor-pointer">
        <input
          id="prefer-unfilled-cinema"
          className="m-2 w-4 h-4 cursor-pointer"
          type="checkbox"
          checked={preferUnfilledCinema}
          onChange={() => {
            setPreferUnfilledCinema(!preferUnfilledCinema);
            setUserPreferences((prev) => ({
              ...prev,
              preferUnfilledCinema: !prev.preferUnfilledCinema,
            }));
          }}
        />
        Prefer an unfilled session?
      </label>
    </form>
  );
};

export default UserTimeForm;
