import { Typography, Button } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

const { Title, Text } = Typography;

const Card = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <li className=" w-[500px] h-[500px] border rounded p-2 bg-white  flex flex-col items-center relative">
            <Title level={2} className="mb-2">
                PASTA
            </Title>
            <img
                className="w-full h-48 object-cover mb-5"
                src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.616.493.suffix/1615916524567.jpeg"
                alt=""
            />
            <Text mark>10 min</Text>
            <Text strong className="mb-5">
                carrot, pasta, souse, chesse, carror, tomato, oil, lazania
            </Text>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                aut aperiam magnam, eaque cumque, impedit ex, quos nihil
                delectus blanditiis ratione optio mollitia. Magnam unde iusto
                quam itaque adipisci omnis.
            </p>
            <Button disabled={!isAuthenticated} className="mt-auto">
                <SaveFilled /> Save
            </Button>
            {/* <p className="absolute top-1 right-1 ">Your</p>
            <p className="absolute top-1 right-1">Saved</p> */}
        </li>
    );
};

export default Card;
