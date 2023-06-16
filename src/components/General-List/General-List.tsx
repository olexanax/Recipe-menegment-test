import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useEffect } from "react";
import {
    GeneralListSavedIdsSelector,
    GeneralListRecipesSelector,
} from "../../selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes } from "../../slices/generalRecipesSlice";
import { RootState } from "../../interfaces";
import { AppDispatch } from "../../interfaces";

const GeneralList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector(GeneralListRecipesSelector);
    const savedIDs = useSelector(GeneralListSavedIdsSelector);
    const status = useSelector(
        (state: RootState) => state.general.recipeLoadinfStatus
    );

    useEffect(() => {
        dispatch(fetchRecipes());
    }, []);

    const loading = status === "loading" && !data.length ? <Spinner /> : null;
    const error = status === "error" ? <ErrorMessage /> : null;
    const content =
        !error && !loading
            ? data.map(
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
                          listType="general"
                          isSaved={savedIDs?.some((someId) => someId == id)!}
                      />
                  )
              )
            : null;
    return (
        <ul className="wrapper flex flex-wrap gap-5 justify-center p-2">
            {loading}
            {error}
            {content}
            {!data.length && !loading && <p>unfortunately, list is empty</p>}
        </ul>
    );
};

export default GeneralList;
