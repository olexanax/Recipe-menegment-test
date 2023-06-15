import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
const { Text } = Typography;

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <ErrorMessage />
            <Text strong onClick={goBack}>
                <ArrowLeftOutlined />
                Back
            </Text>
        </>
    );
};

export default ErrorPage;
