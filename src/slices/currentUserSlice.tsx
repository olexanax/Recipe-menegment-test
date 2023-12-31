import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useHttp";
import { currentUserStore, SavedRecipe, User } from "../interfaces";

const initialState: currentUserStore = {
    userLoadingStatus: "idle",
    currentUser: null,
};

export const fetchCurrentUser = createAsyncThunk(
    "currentUser/fetchCurrentUser",
    async (userId: string) => {
        const { request } = useHttp();
        return await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users/${userId}`
        );
    }
);
export const favoriteRecipe = createAsyncThunk(
    "currentUser/favoriteRecipe",
    async ({ userId, recipe }: { userId: string; recipe: SavedRecipe }) => {
        const { request } = useHttp();
        const users: User[] = await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users`
        );
        const user = users.find((someUser: User) => someUser.mail === userId);
        user!.savedRecipes.push(recipe);
        return await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users/${user?.id}`,
            "PUT",
            JSON.stringify(user)
        );
    }
);
export const unFavoriteRecipe = createAsyncThunk(
    "currentUser/unFavoriteRecipe",
    async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
        const { request } = useHttp();
        const users: User[] = await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users`
        );
        const user = users.find((someUser: User) => someUser.mail === userId);
        user!.savedRecipes = user!.savedRecipes.filter(
            (someRecipe) => someRecipe.id !== recipeId
        );
        console.log(user);
        return await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users/${user?.id}`,
            "PUT",
            JSON.stringify(user)
        );
    }
);

export const addOwnRecipe = createAsyncThunk(
    "currentUser/addOwnRecipe",
    async ({ userId, recipe }: { userId: string; recipe: SavedRecipe }) => {
        const { request } = useHttp();
        const users: User[] = await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users`
        );
        const user = users.find((someUser: User) => someUser.mail === userId);
        user!.ownReciptes.push(recipe);
        return await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users/${user?.id}`,
            "PUT",
            JSON.stringify(user)
        );
    }
);
export const removeOwnRecipe = createAsyncThunk(
    "currentUser/removeOwnRecipe",
    async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
        const { request } = useHttp();
        const users: User[] = await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users`
        );
        const user = users.find((someUser: User) => someUser.mail === userId);
        user!.ownReciptes = user!.ownReciptes.filter(
            (someRecipe) => someRecipe.id !== recipeId
        );
        return await request(
            `https://6488bf090e2469c038fe4bc4.mockapi.io/users/${user?.id}`,
            "PUT",
            JSON.stringify(user)
        );
    }
);
const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        deleteCurrentUser: (state) => {
            state.currentUser = null;
        },
        setCurrentUser: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            ///fetchCurrentUser
            .addCase(fetchCurrentUser.pending, (state) => {
                state.userLoadingStatus = "loading";
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.userLoadingStatus = "idle";
                state.currentUser = payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.userLoadingStatus = "error";
            })
            ///favoriteRecipe
            .addCase(favoriteRecipe.pending, (state) => {
                console.log("add recipe loading");
            })
            .addCase(favoriteRecipe.fulfilled, (state, { payload }) => {
                state.currentUser = payload;
            })
            .addCase(favoriteRecipe.rejected, (state) => {
                console.log("add recipe error");
            })
            ///unFavoriteRecipe
            .addCase(unFavoriteRecipe.pending, (state) => {
                console.log("remove recipe loading");
            })
            .addCase(unFavoriteRecipe.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.currentUser = payload;
            })
            .addCase(unFavoriteRecipe.rejected, (state) => {
                console.log("remove recipe error");
            })
            ///addOwnRecipe
            .addCase(addOwnRecipe.pending, (state) => {
                console.log("add own recipe loading");
            })
            .addCase(addOwnRecipe.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.currentUser = payload;
            })
            .addCase(addOwnRecipe.rejected, (state) => {
                console.log("add own recipe error");
            })
            ///removeOwnRecipe
            .addCase(removeOwnRecipe.pending, (state) => {
                console.log("remove own recipe loading");
            })
            .addCase(removeOwnRecipe.fulfilled, (state, { payload }) => {
                state.currentUser = payload;
            })
            .addCase(removeOwnRecipe.rejected, (state) => {
                console.log("remove own recipe error");
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = currentUserSlice;
export default reducer;
export const { deleteCurrentUser, setCurrentUser } = actions;
