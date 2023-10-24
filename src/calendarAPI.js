import axios from "axios";

const BASE_URL = "https://www.googleapis.com/calendar/v3";

export const optionsForMovies = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZmNTFmMTAwMmQyYjc2YjQ0OGExZTU1NzhjYTU5ZSIsInN1YiI6IjY1MzgxZDBjNDFhYWM0MDBlMDQwNTlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IKZylHI9D7VnwoXWs6WSaP4-6sRW3ES4UEH64WD7hgs",
  },
};

const API_HEADERS = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
    };
}

export const listCalendars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me/calendarList`, {
      headers: API_HEADERS(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCalendar = async (calendarId) => {
  try {
    const response = await axios.get(`${BASE_URL}/calendars/${calendarId}`, {
      headers: API_HEADERS(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCalendar = async (summary) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/calendars`,
      { summary },
      {
        headers: API_HEADERS(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
