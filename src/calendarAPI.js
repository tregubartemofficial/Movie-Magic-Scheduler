import axios from "axios";

const BASE_URL = "https://www.googleapis.com/calendar/v3";

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

// ... Define more functions for other API endpoints as needed
