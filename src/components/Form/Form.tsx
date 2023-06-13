import { useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const Form: React.FC = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    return (
        <div className="w-[500px] bg-slate-600">
            <div className=" flex justify-between text-white p-4">
                <p>ADD YOUR OWN RECIPT</p>
                {isHidden ? (
                    <DownOutlined onClick={() => setIsHidden(false)} />
                ) : (
                    <UpOutlined onClick={() => setIsHidden(true)} />
                )}
            </div>

            {!isHidden && (
                <form className="flex flex-col p-2 gap-4">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <textarea></textarea>
                    <textarea></textarea>
                    <button type="submit"></button>
                </form>
            )}
        </div>
    );
};

export default Form;
