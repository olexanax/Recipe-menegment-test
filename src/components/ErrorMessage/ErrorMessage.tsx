import { Typography } from "antd";

const { Title } = Typography;
const ErrorMessage = () => {
    return (
        <div className="flex flex-col">
            <Title>Somethin is wrong :(</Title>
            <img
                src="https://media3.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=ecf05e470zir4c0ix8lrzkbqesi1upja0a4mrfkte2teicq0&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt=""
            />
        </div>
    );
};

export default ErrorMessage;
