import axios from "axios";
import { setUserEndTime, setUserStartTime } from "./redux/calendarSlice";

const BASE_URL = "https://www.googleapis.com/calendar/v3";
const dayCalendarURL = (from, to) =>
  `${BASE_URL}calendars/primary/events?timeMin=${from.toISOString()}&timeMax=${to.toISOString()}`;

export const optionsForMovies = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZmNTFmMTAwMmQyYjc2YjQ0OGExZTU1NzhjYTU5ZSIsInN1YiI6IjY1MzgxZDBjNDFhYWM0MDBlMDQwNTlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IKZylHI9D7VnwoXWs6WSaP4-6sRW3ES4UEH64WD7hgs",
  },
};

const API_HEADERS = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getTodayEvents = (date, dispatch) => {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    axios
      .get(dayCalendarURL(today, endOfDay), {
        headers: API_HEADERS(),
        params: {
          timeMin: today.toISOString(),
          timeMax: endOfDay.toISOString(),
        },
      })
      .then((response) => {
        if (response.data.items) {
          const startTimes = [];
          const endTimes = [];

          for (const event of response.items) {
            const startTimestamp = new Date(event.start.dateTime).getTime();
            const endTimestamp = new Date(event.end.dateTime).getTime();

            startTimes.push(startTimestamp);
            endTimes.push(endTimestamp);
          }

          dispatch(setUserStartTime(startTimes));
          dispatch(setUserEndTime(endTimes));
        }
       dispatch(setUserStartTime(date)); 
      });
  } catch (error) {
    console.error(error);
  }
};

// export const listCalendars = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/me/calendarList`, {
//       headers: API_HEADERS(),
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
