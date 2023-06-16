import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
    favoriteRecipe,
    unFavoriteRecipe,
    removeOwnRecipe,
} from "../../slices/currentUserSlice";

import { CardProps } from "../../interfaces/index";
import { AppDispatch } from "../../interfaces/index";

import { Typography, Button } from "antd";
import { StarFilled, DeleteFilled, EditOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const Card: React.FC<CardProps> = ({
    name,
    avatar,
    cookingTime,
    description,
    manual,
    ingredients,
    type,
    id,
    listType,
    isSaved,
}) => {
    const { isAuthenticated } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth0();

    const onClick = () => {
        if (isAuthenticated) {
            if (listType === "general" && !isSaved) {
                dispatch(
                    favoriteRecipe({
                        userId: user?.email!,
                        recipe: {
                            createdAt: new Date(),
                            name,
                            avatar,
                            description,
                            manual,
                            cookingTime,
                            ingredients,
                            type,
                            id,
                            progress: ingredients.reduce((acc, item) => {
                                return { ...acc, [item]: false };
                            }, {}),
                        },
                    })
                );
            } else if (listType === "saved" && isSaved) {
                switch (type) {
                    case "general":
                        dispatch(
                            unFavoriteRecipe({
                                userId: user?.email!,
                                recipeId: id,
                            })
                        );
                        break;
                    case "own":
                        console.log("own");
                        dispatch(
                            removeOwnRecipe({
                                userId: user?.email!,
                                recipeId: id,
                            })
                        );
                        break;
                }
            }
        }
    };

    const saveButton =
        type === "general" ? (
            <div className="flex items-center">
                <StarFilled />
                {listType === "saved"
                    ? "Make Unfavorite"
                    : isSaved
                    ? "Already Favorite"
                    : "Make Favorite"}
            </div>
        ) : null;
    const removeOwnButton =
        type === "own" ? (
            <div className="flex items-center">
                <DeleteFilled /> Delete own recipe
            </div>
        ) : null;

    return (
        <li className="w-full  sm:w-[500px] sm:h-[500px] border rounded p-2 bg-white  flex flex-col items-center relative hover:shadow-xl">
            <Title level={2} className="mb-2">
                {name}
            </Title>
            <img
                className="w-full h-48 object-cover mb-5"
                src={avatar}
                alt={name}
            />
            <Text mark>{cookingTime} min</Text>
            <Text strong className="mb-5">
                {ingredients.join(", ")}
            </Text>
            <Text strong>Description:</Text>
            <Text>{description}</Text>
            <div className="mt-auto flex gap-2">
                <Button disabled={!isAuthenticated} onClick={onClick}>
                    {removeOwnButton}
                    {saveButton}
                </Button>
                <Button disabled={!isAuthenticated}>
                    {isAuthenticated ? (
                        <Link to={`/recipt/${id}`}>Show more</Link>
                    ) : (
                        "Show more"
                    )}
                </Button>
            </div>

            <Text type="success" className="absolute top-2 right-2 text-xl">
                {isSaved && type === "general" && (
                    <div className="flex items-center">
                        <StarFilled />
                        Favorite
                    </div>
                )}
                {isSaved && type === "own" && (
                    <div className="flex items-center">
                        <EditOutlined />
                        Own
                    </div>
                )}
            </Text>
        </li>
    );
};

export default Card;
