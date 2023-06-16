import { RootState } from "../interfaces";
import { createSelector } from "@reduxjs/toolkit";

export const statusSelector = createSelector(
    (state: RootState) => state.general.recipeLoadinfStatus,
    (state: RootState) => state.currentUser.userLoadingStatus,
    (generalLoading, userLoading) => {
        return generalLoading === "error" || userLoading === "error"
            ? "error"
            : generalLoading === "loading" || userLoading === "loading"
            ? "loading"
            : "idle";
    }
);
export const GeneralListSavedIdsSelector = createSelector(
    (state: RootState) => state.currentUser.currentUser?.savedRecipes,
    (items) => items?.map((recipe) => recipe.id)
);
export const GeneralListRecipesSelector = createSelector(
    (state: RootState) => state.general.recipes,
    (state: RootState) => state.filters.allPageSearchTerm,
    (list, search) =>
        list.filter((recipe) => recipe.name.toLowerCase().includes(search))
);

export const savedListRecipesSelector = createSelector(
    (state: RootState) => state.currentUser.currentUser?.savedRecipes,
    (state: RootState) => state.currentUser.currentUser?.ownReciptes,
    (state: RootState) => state.filters.savePageFilterTerm,
    (state: RootState) => state.filters.savePageSearchTerm,
    (saved, own, filter, search) =>
        filter === "all"
            ? [...(saved || []), ...(own || [])]
            : filter === "own"
            ? [...(own || [])]
            : filter === "favorite"
            ? [...(saved || [])]
                  .sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);
                      return dateA.getTime() - dateB.getTime();
                  })
                  .filter((recipe) =>
                      recipe.name.toLowerCase().includes(search)
                  )
            : []
);
export const savedListsSvedIdsSelector = createSelector(
    (state: RootState) => state.currentUser.currentUser?.savedRecipes,
    (state: RootState) => state.currentUser.currentUser?.ownReciptes,
    (saved, own) => saved?.concat(own!).map((recipe) => recipe.id)
);
