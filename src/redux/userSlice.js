import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'isUserLoggedIn',
    initialState: {
        value: false,
    },
    reducers: {
        userLoggedIn: (state) => {
            state.value = true;
        },
        userLoggedOut: (state) => {
            state.value = false;
        },
    },
});
export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
