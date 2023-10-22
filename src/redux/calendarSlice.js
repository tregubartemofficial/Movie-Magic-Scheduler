import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendar: null,
  date: new Date().toISOString().split("T")[0],
  startTime: null,
  endTime: null,
  preferUnfilledCinema: false,
  preferOwnCalendar: false,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setUserCalendar: (state, { payload }) => {
      state.calendar = payload;
    },
    setUserDate: (state, { payload }) => {
      state.date = payload;
    },
    setUserStartTime: (state, { payload }) => {
      state.startTime = payload;
    },
    setUserEndTime: (state, { payload }) => {
      state.endTime = payload;
    },
    setUserPreferUnfilledCinema: (state, { payload }) => {
      state.preferUnfilledCinema = payload;
    },
    setUserPreferOwnCalendar: (state, { payload }) => {
      state.preferOwnCalendar = payload;
    },
    cleanUserPreferences: (state) => {
      state.calendar = null;
      state.date = new Date().toISOString().split("T")[0];
      state.startTime = null;
      state.endTime = null;
    },
  },
});

export const {
  setUserCalendar,
  setUserDate,
  setUserStartTime,
  setUserEndTime,
  setUserPreferUnfilledCinema,
  setUserPreferOwnCalendar,
  cleanUserPreferences,
} = calendarSlice.actions;
export default calendarSlice.reducer;
