import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendar: "",
  date: new Date().toISOString().split("T")[0],
  startTime: "",
  endTime: "",
  preferUnfilledCinema: false,
  preferOwnCalendar: false,
  selectedGenres: [],
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
      if (Array.isArray(payload)) {
        console.log(payload);
      } else state.startTime = payload;
    },
    setUserEndTime: (state, { payload }) => {
      if (Array.isArray(payload)) {
        console.log(payload);
      } else state.endTime = payload;
    },
    setUserPreferUnfilledCinema: (state, { payload }) => {
      state.preferUnfilledCinema = payload;
    },
    setUserPreferOwnCalendar: (state, { payload }) => {
      state.preferOwnCalendar = payload;
    },
    setUserGenre: (state, { payload }) => {
      if (state.selectedGenres.includes(payload)) {
        state.selectedGenres = state.selectedGenres.filter(
          (genre) => genre !== payload
        );
      } else {
        state.selectedGenres.push(payload);
      }
    },
    cleanUserPreferences: (state) => {
      state.calendar = "";
      state.date = new Date().toISOString().split("T")[0];
      state.startTime = "";
      state.endTime = "";
    },
    cleanAllUserPreferences: (state) => {
      state.calendar = "";
      state.date = new Date().toISOString().split("T")[0];
      state.startTime = "";
      state.endTime = "";
      state.preferUnfilledCinema = false;
      state.preferOwnCalendar = false;
      state.selectedGenres = [];
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
  cleanAllUserPreferences,
  setUserGenre,
} = calendarSlice.actions;
export default calendarSlice.reducer;
