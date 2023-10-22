import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: '',
            email: '',
        },
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user.name = payload.name;
            state.email = payload.email;
        },
        setIsLoggedIn: (state, {payload}) => {
            state.isLoggedIn = payload;
        },
    },
});

export const { setUser, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
