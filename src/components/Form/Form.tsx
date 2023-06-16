import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import createId from "../../utils/createId";

import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Inputs, SavedRecipe, AppDispatch } from "../../interfaces";
import { addOwnRecipe } from "../../slices/currentUserSlice";

const Form: React.FC = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth0();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { name, description, avatar, manual, ingredients, cookingTime } =
            data;
        const recipe: SavedRecipe = {
            createdAt: new Date(),
            name,
            avatar: avatar
                ? avatar
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
            description,
            manual,
            cookingTime: +cookingTime,
            ingredients: ingredients.split(","),
            type: "own",
            id: createId(),
            progress: ingredients.split(" ").reduce((acc, item) => {
                return { ...acc, [item]: false };
            }, {}),
        };
        dispatch(addOwnRecipe({ userId: user?.email!, recipe }));
        reset();
    };

    return (
        <div className="max-w-screen-sm w-full m-4 bg-slate-600 rounded">
            <div className=" flex justify-between text-white p-4">
                <p>ADD YOUR OWN RECIPE</p>
                {isHidden ? (
                    <DownOutlined onClick={() => setIsHidden(false)} />
                ) : (
                    <UpOutlined onClick={() => setIsHidden(true)} />
                )}
            </div>

            {!isHidden && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-2 gap-4"
                >
                    <input
                        {...register("name", { required: true })}
                        className="h-8 rounded p-1"
                        placeholder="Recipe name"
                    />
                    {errors.name && <span>This field is required</span>}

                    <input
                        {...register("description", { required: true })}
                        className="h-8 rounded p-1"
                        placeholder="Description"
                    />
                    {errors.description && <span>This field is required</span>}

                    <input
                        {...register("ingredients", { required: true })}
                        className="h-8 rounded p-1"
                        placeholder="The ingredients(writing through a comma)"
                    />
                    {errors.ingredients && <span>This field is required</span>}

                    <input
                        {...register("manual", { required: true })}
                        className="h-8 rounded p-1"
                        placeholder="Manual"
                    />
                    {errors.manual && <span>This field is required</span>}
                    <input
                        {...register("cookingTime", { required: true })}
                        type="number"
                        className="h-8 rounded p-1"
                        placeholder="Cooking Time (minutes)"
                    />
                    {errors.cookingTime && <span>This field is required</span>}

                    <input
                        {...register("avatar")}
                        className="h-8 rounded p-1"
                        placeholder="Add link for photo"
                    />
                    {errors.avatar && <span>This field is required</span>}
                    <button className="bg-white text-black" type="submit">
                        submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default Form;
