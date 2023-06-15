import { configureStore } from "@reduxjs/toolkit";
import general from "../slices/generalRecipesSlice";
import currentUser from "../slices/currentUserSlice";

const store = configureStore({
    reducer: { general, currentUser },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
