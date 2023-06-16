import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Text } = Typography;

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <Text strong className="absolute left-4 top-4" onClick={goBack}>
            <ArrowLeftOutlined />
            Back
        </Text>
    );
};

export default BackButton;
