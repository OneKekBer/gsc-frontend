import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: "",
};

export const inputFilter = createSlice({
    name: "inputFilter",
    initialState,
    reducers: {
        addInputFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addInputFilter } = inputFilter.actions;

export const inputFilterReducer = inputFilter.reducer;
