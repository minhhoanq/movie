import { createSlice } from "@reduxjs/toolkit";

export const themeModeSlice = createSlice({
    name: "themeMode",
    initialState: {
        themeMode: "dark",
    },
    reducers: {
        setTheme: (state, action) => {
            state.themeMode = action.payload;
        },
    },
});

export const { setTheme } = themeModeSlice.actions;
export default themeModeSlice.reducer;
