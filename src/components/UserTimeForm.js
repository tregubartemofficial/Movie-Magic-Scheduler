import React from "react";
import InputTime from "../ui/InputTime";
import InputCalendar from "../ui/InputCalendar";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserPreferences,
  setUserPreferOwnCalendar,
  setUserPreferUnfilledCinema,
} from "../redux/calendarSlice";

const UserTimeForm = () => {
  const dispatch = useDispatch();

  const { preferOwnCalendar, preferUnfilledCinema } = useSelector(
    (state) => state.calendar
  );

  return (
    <form className="flex-center col">
      {preferOwnCalendar ? (
        <>
          <InputCalendar />
        </>
      ) : (
        <>
          <InputTime type="startTime" />
          <InputTime type="endTime" />
        </>
      )}
      <div className="flex-center">
        <label
          className={`label-checkbox ${
            preferOwnCalendar ? "label-checkbox-active" : ""
          }`}
          htmlFor="prefer-own-calendar"
        >
          <input
            id="prefer-own-calendar"
            className="checkbox"
            type="checkbox"
            checked={preferOwnCalendar}
            onChange={() => {
              dispatch(cleanUserPreferences());
              dispatch(setUserPreferOwnCalendar(!preferOwnCalendar));
            }}
          />
          Use my own calendar
        </label>
        <label
          className={`label-checkbox ${
            preferUnfilledCinema ? "label-checkbox-active" : ""
          }`}
          htmlFor="prefer-unfilled-cinema"
        >
          <input
            id="prefer-unfilled-cinema"
            className="checkbox"
            type="checkbox"
            checked={preferUnfilledCinema}
            onChange={() => {
              dispatch(setUserPreferUnfilledCinema(!preferUnfilledCinema));
            }}
          />
          Prefer an unfilled session?
        </label>
      </div>
    </form>
  );
};

export default UserTimeForm;
