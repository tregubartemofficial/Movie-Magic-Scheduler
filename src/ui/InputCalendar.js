import React from "react";
import { setUserCalendar, setUserDate, setUserEndTime, setUserStartTime } from "../redux/calendarSlice";
import { useDispatch } from "react-redux";

const extractBusyTimes = (icsData) => {
  const busyTimes = [];
  const lines = icsData.split("\n");

  let inEvent = false;
  let eventStartTime = null;
  let eventEndTime = null;

  for (const line of lines) {
    if (line.includes("BEGIN:VEVENT")) {
      inEvent = true;
    } else if (line.includes("END:VEVENT")) {
      inEvent = false;
      if (eventStartTime && eventEndTime) {
        busyTimes.push({ start: eventStartTime, end: eventEndTime });
      }
      eventStartTime = null;
      eventEndTime = null;
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) {
        eventStartTime = line.replace("DTSTART:", "");
      } else if (line.startsWith("DTEND")) {
        eventEndTime = line.replace("DTEND:", "");
      }
    }
  }

  return busyTimes;
};

const formatICSToTimestamp = (icsData) => {
  const date = icsData.split(":")[1];
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hours = date.slice(9, 11);
  const minutes = date.slice(11, 13);
  const seconds = date.slice(13, 15);
  const timestamp = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
    seconds
  ).getTime();
  return timestamp;
};

const InputCalendar = () => {
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      try {
        const busyTimesArray = extractBusyTimes(fileContent);
        busyTimesArray.map((busyTime) => {
          return {
            start: (busyTime.start = formatICSToTimestamp(busyTime.start)),
            end: (busyTime.end = formatICSToTimestamp(busyTime.end)),
          };
        });
        dispatch(setUserCalendar(busyTimesArray));
        dispatch(setUserDate(busyTimesArray[0].start));
        dispatch(setUserStartTime(busyTimesArray[0].start));
        dispatch(setUserEndTime(busyTimesArray[0].end));
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="calendar-input">
      <label htmlFor="calendar" className="label">
        Insert your day calendar:
        <input
          className="input"
          id="calendar"
          type="file"
          accept=".ics"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default InputCalendar;
