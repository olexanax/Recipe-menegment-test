import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <Title>Something is wrong :(</Title>
            <Text strong onClick={goBack}>
                <ArrowLeftOutlined />
                Back
            </Text>
        </>
    );
};

export default ErrorPage;
