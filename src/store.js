import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./redux/calendarSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice,
    },
})