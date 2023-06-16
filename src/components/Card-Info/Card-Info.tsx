import BackButton from "../BackButton/BackButton";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { useSelector } from "react-redux";

import { Typography, Checkbox } from "antd";
import { GeneralRecipe, SavedRecipe, RootState } from "../../interfaces";
import { statusSelector } from "../../selectors";
const { Title, Text } = Typography;

const CardInfo: React.FC = () => {
    const { recipeId } = useParams();
    const ownRecipes = useSelector(
        (state: RootState) => state.currentUser.currentUser?.ownReciptes
    );
    const status = useSelector(statusSelector);
    const { request } = useHttp();
    const [recipe, setRecipe] = useState<SavedRecipe | GeneralRecipe>();

    useEffect(() => {
        if (ownRecipes) {
            const recipes: (GeneralRecipe | SavedRecipe)[] = [];
            request(`https://6488bf090e2469c038fe4bc4.mockapi.io/recipes`).then(
                (res: GeneralRecipe[]) => {
                    recipes.push(...ownRecipes!, ...res);
                    setRecipe(
                        recipes.find((someRecipe) => {
                            return someRecipe.id === recipeId;
                        })
                    );
                }
            );
        }
        //eslint-disable-next-line
    }, [ownRecipes]);

    const loading = status === "loading" || !recipe ? <Spinner /> : null;
    const error = status === "error" ? <ErrorMessage /> : null;
    const content =
        status === "idle" ? (
            <>
                <Title className="text-center">{recipe?.name}</Title>

                <div className="flex flex-col sm:flex-row sm:gap-10 gap-4  justify-center items-center mb-4">
                    <img
                        className="w-1/2  object-cover"
                        src={recipe?.avatar}
                        alt=""
                    />
                    <ul>
                        {recipe?.ingredients.map((item, i) => (
                            <li key={i}>
                                <Checkbox>{item}</Checkbox>
                            </li>
                        ))}
                    </ul>
                </div>
                {recipe ? <Title level={3}>How it cook?</Title> : null}
                <Text>{recipe?.manual}</Text>
                {recipe ? <Title level={3}>Description</Title> : null}
                <Text>{recipe?.description}</Text>
            </>
        ) : null;

    return (
        <div className="relative p-4 flex flex-col items-center w-full">
            <BackButton />
            {loading}
            {error}
            {content}
        </div>
    );
};

export default CardInfo;
