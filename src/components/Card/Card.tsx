import { Typography, Button } from "antd";
import { SaveFilled, StarFilled } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
    favoriteRecipe,
    unFavoriteRecipe,
} from "../../slices/currentUserSlice";
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
                dispatch(
                    unFavoriteRecipe({ userId: user?.email!, recipeId: id })
                );
            }
        }
    };
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
                <StarFilled />{" "}
                {listType == "general" ? "Make favorite" : "Make unfavorite"}
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
