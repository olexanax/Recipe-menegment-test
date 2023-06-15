import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { CardProps } from "antd";
import { RootState, FilterTypes } from "../../interfaces";
import { useEffect } from "react";
import Card from "../Card/Card";
const SavedList: React.FC = () => {
    const recipesSelector = createSelector(
        (state: RootState) => state.currentUser.currentUser?.savedRecipes,
        (state: RootState) => state.currentUser.currentUser?.ownReciptes,
        (state: RootState) => state.filters.savePageFilterTerm,
        (state: RootState) => state.filters.savePageSearchTerm,
        (saved, own, filter, search) =>
            filter === "all"
                ? [...(saved || []), ...(own || [])]
                : filter === "own"
                ? [...(own || [])]
                : filter == "favorite"
                ? [...(saved || [])]
                      .sort((a, b) => {
                          const dateA = new Date(a.createdAt);
                          const dateB = new Date(b.createdAt);
                          return dateB.getTime() - dateA.getTime();
                      })
                      .filter((recipe) =>
                          recipe.name.toLowerCase().includes(search)
                      )
                : []
    );
    const savedIdsSelector = createSelector(
        (state: RootState) => state.currentUser.currentUser?.savedRecipes,
        (state: RootState) => state.currentUser.currentUser?.ownReciptes,
        (saved, own) => saved?.concat(own!).map((recipe) => recipe.id)
    );
    const savedIDs = useSelector(savedIdsSelector);
    const recipes = useSelector(recipesSelector);

    return (
        <ul className="wrapper flex flex-wrap gap-2 justify-center p-2">
            {recipes.map(
                ({
                    name,
                    avatar,
                    cookingTime,
                    description,
                    ingredients,
                    type,
                    id,
                    manual,
                }) => (
                    <Card
                        name={name}
                        avatar={avatar}
                        cookingTime={cookingTime}
                        description={description}
                        ingredients={ingredients}
                        type={type}
                        id={id}
                        key={id}
                        manual={manual}
                        listType="saved"
                        isSaved={savedIDs?.some((someId) => someId == id)!}
                    />
                )
            )}
            {!recipes.length && <p>unfortunately, list is empty</p>}
        </ul>
    );
};

export default SavedList;
