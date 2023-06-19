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
        <div className="max-w-screen-sm w-full my-4 bg-slate-600 rounded">
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
                    className="flex flex-col p-2 gap-3"
                >
                    <label className="flex gap-1 text-white">
                        Recipe name:
                        <span className="text-grey opacity-50">(required)</span>
                    </label>
                    <input
                        {...register("name", { required: true })}
                        className="h-8 rounded p-1"
                        placeholder="Margarita"
                    />
                    {errors.name && (
                        <span className="text-red-600">
                            This field is required
                        </span>
                    )}

                    <label className="flex gap-1 text-white">
                        Description:
                        <span className="text-grey opacity-50">(required)</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        className=" rounded p-1 h-24"
                        placeholder="One of the world's most famous, and most-loved..."
                    />
                    {errors.description && (
                        <span className="text-red-600">
                            This field is required
                        </span>
                    )}

                    <label className="flex gap-1 text-white">
                        Ingredients (separated by comma):
                        <span className="text-grey opacity-50">(required)</span>
                    </label>
                    <input
                        {...register("ingredients", { required: true })}
                        className="h-8 rounded p-1"
                        placeholder="Tomato, mozzarella, basil leaves"
                    />
                    {errors.ingredients && (
                        <span className="text-red-600">
                            This field is required
                        </span>
                    )}

                    <label className="flex gap-1 text-white">
                        Manual:
                        <span className="text-grey opacity-50">(required)</span>
                    </label>
                    <textarea
                        {...register("manual", { required: true })}
                        className="rounded p-1 h-24"
                        placeholder="Step 1Place salt on small shallow plate..."
                    />
                    {errors.manual && (
                        <span className="text-red-600">
                            This field is required
                        </span>
                    )}

                    <label className="flex gap-1 text-white">
                        Cooking Time (minutes):
                        <span className="text-grey opacity-50">(required)</span>
                    </label>
                    <input
                        {...register("cookingTime", { required: true })}
                        type="number"
                        className="h-8 rounded p-1"
                        placeholder="33"
                    />
                    {errors.cookingTime && (
                        <span className="text-red-600">
                            This field is required
                        </span>
                    )}

                    <label className="flex gap-1 text-white">
                        Add link for photo:
                        <span className="text-grey opacity-50">(optional)</span>
                    </label>
                    <input
                        {...register("avatar")}
                        className="h-8 rounded p-1"
                        placeholder="Add link for photo"
                    />
                    {errors.avatar && (
                        <span className="text-red-600">
                            This field is required
                        </span>
                    )}

                    <button
                        className="bg-white uppercase font-bold  w-48 self-center mt-4 p-2 rounded-full text-[#1890ff] hover:bg-slate-200"
                        type="submit"
                    >
                        submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default Form;
