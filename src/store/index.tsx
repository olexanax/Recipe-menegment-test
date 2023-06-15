import { configureStore } from "@reduxjs/toolkit";
import general from "../slices/generalRecipesSlice";
import currentUser from "../slices/currentUserSlice";
import filters from "../slices/filtersSlice";

const store = configureStore({
    reducer: { general, currentUser, filters },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
