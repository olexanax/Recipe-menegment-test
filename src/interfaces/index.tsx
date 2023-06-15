import store from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GeneralRecipe {
    createdAt: Date;
    name: string;
    avatar: string;
    description: string;
    manual: string;
    cookingTime: number;
    ingredients: string[];
    type: "general" | "own";
    id: string;
}
export interface savedRecipe {
    createdAt: Date;
    name: string;
    avatar: string;
    description: string;
    manual: string;
    cookingTime: number;
    ingredients: string[];
    type: "general" | "own";
    id: string;
    progress: {
        [key: string]: boolean;
    };
}
export interface SavedRecipe {
    createdAt: Date;
    name: string;
    avatar: string;
    description: string;
    manual: string;
    cookingTime: number;
    ingredients: string[];
    type: "general" | "own";
    id: string;
    progress: { [key: string]: boolean };
}
export interface User {
    mail: string;
    name: string;
    savedRecipes: SavedRecipe[];
    ownReciptes: SavedRecipe[];
    id: string;
}

export interface currentUserStore {
    currentUser: User | null;
    userLoadingStatus: "loading" | "idle" | "error";
}
export interface GeneralRecipeStore {
    recipes: GeneralRecipe[];
    recipeLoadinfStatus: "loading" | "idle" | "error";
}
export interface CardProps {
    name: string;
    avatar: string;
    description: string;
    cookingTime: number;
    ingredients: string[];
    type: "general" | "own";
    id: string;
    manual: string;
    listType: "saved" | "general";
    isSaved: boolean;
}
