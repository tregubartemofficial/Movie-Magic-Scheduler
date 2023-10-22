import React, { useState } from "react";
import InputTime from "../../ui/InputTime";
import InputCalendar from "../../ui/InputCalendar";
import { useDispatch } from "react-redux";
import { cleanUserPreferences, setUserDate, setUserPreferOwnCalendar, setUserPreferUnfilledCinema } from "../../redux/calendarSlice";

const UserTimeForm = () => {
  const [preferUnfilledCinema, setPreferUnfilledCinema] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [preferOwnCalendar, setPreferOwnCalendar] = useState(false);
  const dispatch = useDispatch();

  return (
    <form className="flex-center col">
      {preferOwnCalendar ? (
        <InputCalendar />
      ) : (
        <>
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
                dispatch(setUserDate(event.target.value));
              }}
            />
          </label>
          <InputTime type="startTime" />
          <InputTime type="endTime" />
        </>
      )}
      <label htmlFor="prefer-own-calendar">
        <input
          id="prefer-own-calendar"
          className="checkbox"
          type="checkbox"
          checked={preferOwnCalendar}
          onChange={() => {
            setPreferOwnCalendar(!preferOwnCalendar);
            dispatch(cleanUserPreferences());
            dispatch(setUserPreferOwnCalendar(!preferOwnCalendar));
          }}
        />
        Use my own calendar
      </label>
      <label htmlFor="prefer-unfilled-cinema">
        <input
          id="prefer-unfilled-cinema"
          className="checkbox"
          type="checkbox"
          checked={preferUnfilledCinema}
          onChange={() => {
            setPreferUnfilledCinema(!preferUnfilledCinema);
            dispatch(setUserPreferUnfilledCinema(!preferUnfilledCinema));
          }}
        />
        Prefer an unfilled session?
      </label>
    </form>
  );
};

export default UserTimeForm;
