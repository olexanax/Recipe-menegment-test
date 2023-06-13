import { Typography, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const AboutRecipePage: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="relative flex flex-col items-center">
            <Title>NAME</Title>
            <Text>
                is ready for <Text strong>70</Text> %
            </Text>
            <div className="w-full flex gap-10 justify-center">
                <img
                    className="w-1/4"
                    src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.616.493.suffix/1615916524567.jpeg"
                    alt=""
                />
                <ul>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                    <li>
                        <Checkbox onChange={() => console.log("Check")}>
                            Tomato
                        </Checkbox>
                    </li>
                </ul>
            </div>
            <Title level={3}>How it cook?</Title>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                nam impedit? Possimus, dolores? Soluta iure tempora maxime quasi
                suscipit! Cumque possimus, eveniet aperiam laboriosam nulla
                repellendus sed suscipit perspiciatis placeat?
            </Text>
            <Title level={3}>Description</Title>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                nam impedit? Possimus, dolores? Soluta iure tempora maxime quasi
                suscipit! Cumque possimus, eveniet aperiam laboriosam nulla
                repellendus sed suscipit perspiciatis placeat?
            </Text>
            <Text strong className="absolute left-4 top-4" onClick={goBack}>
                <ArrowLeftOutlined />
                Back
            </Text>
        </div>
    );
};

export default AboutRecipePage;
