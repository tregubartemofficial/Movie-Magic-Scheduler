import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./redux/calendarSlice";
import userSlice from "./redux/userSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice,
        user: userSlice,
    },
})