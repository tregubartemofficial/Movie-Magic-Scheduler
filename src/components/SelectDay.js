import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDate } from "../redux/calendarSlice";
import { formatDate } from "../App";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";



const listOfDays = () => {
  const nextSixDays = [];
  for (let i = 0; i <= 6; i++) {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + i);

    nextSixDays.push(
      nextDay.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }
  return nextSixDays;
};

const SelectDay = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { date } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const handleDateSelection = (selectedDate) => {
    dispatch(setUserDate(new Date(selectedDate).getTime()));
    setShowDropdown(false);
  };

  const formatedDate = formatDate(date);

  return (
    <div className="select-day">
      <button className="button" onClick={() => setShowDropdown(!showDropdown)}>
        <AiFillCalendar size='1.5em' />
        {formatedDate}
      </button>
      <div className={`menu ${showDropdown ? "active" : ""}`}>
        <ul className="menu-list">
          {listOfDays().map((day) => (
            <li
              className="menu-item"
              key={day}
              onClick={() => handleDateSelection(day)}
            >
              {formatDate(day)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectDay;
