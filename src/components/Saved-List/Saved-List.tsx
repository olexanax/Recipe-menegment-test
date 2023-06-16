import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Card from "../Card/Card";

import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {
    savedListRecipesSelector,
    savedListsSvedIdsSelector,
} from "../../selectors";
import { RootState } from "../../interfaces";

const SavedList: React.FC = () => {
    const savedIDs = useSelector(savedListsSvedIdsSelector);
    const recipes = useSelector(savedListRecipesSelector);
    const status = useSelector(
        (state: RootState) => state.currentUser.userLoadingStatus
    );
    const user = useSelector(
        (state: RootState) => state.currentUser.currentUser
    );
    const { isAuthenticated } = useAuth0();

    const loading =
        status === "loading" || !isAuthenticated ? <Spinner /> : null;
    const error = status === "error" ? <ErrorMessage /> : null;
    const content =
        status === "idle" ? (
            <ul className="wrapper flex flex-wrap gap-5 justify-center p-2">
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
            </ul>
        ) : null;
    return (
        <ul className="wrapper flex flex-wrap gap-2 justify-center p-2">
            {loading}
            {error}
            {content}
            {!recipes.length && user && <p>unfortunately, list is empty</p>}
        </ul>
    );
};

export default SavedList;
