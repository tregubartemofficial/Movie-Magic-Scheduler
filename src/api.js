import axios from "axios";
import { setUserEndTime, setUserStartTime } from "./redux/calendarSlice";

const formatDataToTime = (dateObj) => {
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  if (!hours && !minutes) return "00:00";
  return `${hours}:${minutes}`;
};

const dayCalendarURL = (from, to) =>
  `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${from.toISOString()}&timeMax=${to.toISOString()}`;

export const optionsForMovies = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZmNTFmMTAwMmQyYjc2YjQ0OGExZTU1NzhjYTU5ZSIsInN1YiI6IjY1MzgxZDBjNDFhYWM0MDBlMDQwNTlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IKZylHI9D7VnwoXWs6WSaP4-6sRW3ES4UEH64WD7hgs",
  },
};

const API_HEADERS = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};




export const getTodayEvents = async (date, dispatch) => {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const response = await axios.get(dayCalendarURL(today, endOfDay), {
      headers: API_HEADERS(),
      params: {
        timeMin: today.toISOString(),
        timeMax: endOfDay.toISOString(),
      },
    });

    if (response.data.items[0]) {
      const startTimes = [];
      const endTimes = [];

      for (const event of response.data.items) {
        const startTimestamp = formatDataToTime(
          new Date(event.start.dateTime)
        );
        const endTimestamp = formatDataToTime(new Date(event.end.dateTime));
        startTimes.push(startTimestamp);
        endTimes.push(endTimestamp);
      }
      // didnt implement logic with multiple time slots
      // dispatch(setUserStartTime(startTimes));
      // dispatch(setUserEndTime(endTimes));
    } else {
      dispatch(setUserStartTime(formatDataToTime(today)));
      dispatch(setUserEndTime(formatDataToTime(endOfDay)));
    }
  } catch (error) {
    console.error(error);
  }
};
