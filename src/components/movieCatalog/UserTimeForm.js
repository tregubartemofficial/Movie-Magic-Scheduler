import React, { useState } from "react";
import InputTime from "../../ui/InputTime";
import InputCalendar from "../../ui/InputCalendar";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserPreferences,
  setUserDate,
  setUserPreferOwnCalendar,
  setUserPreferUnfilledCinema,
} from "../../redux/calendarSlice";

const UserTimeForm = () => {
  const dispatch = useDispatch();
  const { startTime, endTime } = useSelector((state) => state.calendar);

  const [preferUnfilledCinema, setPreferUnfilledCinema] = useState(false);
  const [preferOwnCalendar, setPreferOwnCalendar] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <form className="flex-center col">
      {preferOwnCalendar ? (
        <>
          <InputCalendar />
          {startTime && (
              <p>
                {new Date(startTime).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: 'numeric' })} -
                {new Date(endTime).toLocaleString([], { hour: 'numeric', minute: 'numeric' })}
              </p>
          )}
        </>
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
