import { Typography, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { statusSelector } from "../../selectors";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { GeneralRecipe, SavedRecipe, RootState } from "../../interfaces";
const { Title, Text } = Typography;

const CardInfo: React.FC = () => {
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const ownRecipes = useSelector(
        (state: RootState) => state.currentUser.currentUser?.ownReciptes
    );
    const status = useSelector(statusSelector);
    const { request } = useHttp();
    const [recipe, setRecipe] = useState<SavedRecipe | GeneralRecipe>();

    const goBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        console.log(status);
    });
    useEffect(() => {
        if (ownRecipes) {
            const recipes: (GeneralRecipe | SavedRecipe)[] = [];
            request(`https://6488bf090e2469c038fe4bc4.mockapi.io/recipes`).then(
                (res: GeneralRecipe[]) => {
                    recipes.push(...ownRecipes!, ...res);
                    console.log(recipes);
                    setRecipe(
                        recipes.find((someRecipe) => {
                            console.log(someRecipe.id, recipeId);
                            return someRecipe.id === recipeId;
                        })
                    );
                }
            );
        }
    }, [ownRecipes]);
    const loading = status === "loading" || !recipe ? <Spinner /> : null;
    const error = status === "error" ? <ErrorMessage /> : null;
    const content =
        status === "idle" ? (
            <>
                <Title>{recipe?.name}</Title>

                <div className="w-full flex gap-10 justify-center">
                    <img className="w-1/4" src={recipe?.avatar} alt="" />
                    <ul>
                        {recipe?.ingredients.map((item, i) => (
                            <li key={i}>
                                <Checkbox>{item}</Checkbox>
                            </li>
                        ))}
                    </ul>
                </div>
                <Title level={3}>How it cook?</Title>
                <Text>{recipe?.manual}</Text>
                <Title level={3}>Description</Title>
                <Text>{recipe?.description}</Text>
            </>
        ) : null;
    return (
        <div className="relative flex flex-col items-center w-full">
            <Text strong className="absolute left-4 top-4" onClick={goBack}>
                <ArrowLeftOutlined />
                Back
            </Text>
            {loading}
            {error}
            {content}
        </div>
    );
};

export default CardInfo;
