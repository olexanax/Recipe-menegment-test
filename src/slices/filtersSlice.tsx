import { createSlice } from "@reduxjs/toolkit";
import { filtersSliceInitialState } from "../interfaces";

const initialState: filtersSliceInitialState = {
    allPageSearchTerm: "",
    allPageFilterTerm: "all",
    savePageSearchTerm: "",
    savePageFilterTerm: "all",
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setAllPageSearchTerm: (state, { payload }) => {
            state.allPageSearchTerm = payload;
        },
        setAllPageFilterTerm: (state, { payload }) => {
            state.allPageFilterTerm = payload;
        },
        setSavePageSearchTerm: (state, { payload }) => {
            state.savePageSearchTerm = payload;
        },
        setSavePageFilterTerm: (state, { payload }) => {
            state.savePageFilterTerm = payload;
        },
    },
});

const { reducer, actions } = filtersSlice;
export default reducer;
export const {
    setAllPageFilterTerm,
    setAllPageSearchTerm,
    setSavePageFilterTerm,
    setSavePageSearchTerm,
} = actions;
