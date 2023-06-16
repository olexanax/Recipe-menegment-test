import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useHttp";
import { GeneralRecipeStore } from "../interfaces";

const initialState: GeneralRecipeStore = {
    recipeLoadinfStatus: "idle",
    recipes: [],
};

export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async () => {
        const { request } = useHttp();
        return await request(
            "https://6488bf090e2469c038fe4bc4.mockapi.io/recipes"
        );
    }
);
const generalRecipesSlice = createSlice({
    name: "general",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.recipeLoadinfStatus = "loading";
            })
            .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
                state.recipeLoadinfStatus = "idle";
                state.recipes = payload;
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.recipeLoadinfStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = generalRecipesSlice;
export default reducer;
