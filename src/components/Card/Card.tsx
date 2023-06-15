import { Typography, Button } from "antd";
import { StarFilled, DeleteFilled } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
    favoriteRecipe,
    unFavoriteRecipe,
    removeOwnRecipe,
} from "../../slices/currentUserSlice";
import { useEffect } from "react";
import { CardProps } from "../../interfaces/index";
import { AppDispatch } from "../../interfaces/index";
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
            console.log(listType, isSaved);
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
                console.log("yep");
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
                // type == "general"
                //     ? dispatch(
                //           unFavoriteRecipe({
                //               userId: user?.email!,
                //               recipeId: id,
                //           })
                //       )
                //     : dispatch(
                //           removeOwnRecipe({
                //               userId: user?.email!,
                //               recipeId: id,
                //           })
                //       );
            }
        }
    };

    const unSaveButton =
        type == "general" ? (
            <>
                <StarFilled />
                Favorite
            </>
        ) : null;
    const removeOwnButton =
        type == "own" ? (
            <>
                <DeleteFilled /> Delete own recipe
            </>
        ) : null;
    return (
        <li className=" w-[500px] h-[500px] border rounded p-2 bg-white  flex flex-col items-center relative">
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
            <Button
                disabled={!isAuthenticated}
                className="mt-auto"
                onClick={onClick}
            >
                {removeOwnButton}
                {unSaveButton}
            </Button>
            {isSaved && (
                <Text type="success" className="absolute top-2 right-2 ">
                    <StarFilled />
                    Favorite
                </Text>
            )}
            {/* <p className="absolute top-1 right-1">Own</p>  */}
        </li>
    );
};

export default Card;
