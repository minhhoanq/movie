import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice({
    name: "appState",
    initialState: {
        appState: "",
    },
    reducers: {
        setAppState: (state, action) => {
            state.appState = action.payload;
        },
    },
});

export const { setAppState } = appStateSlice.actions;
export default appStateSlice.reducer;
