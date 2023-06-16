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
        <div className="absolute left-4 top-4 flex items-center gap-2">
            <ArrowLeftOutlined />
            <Text strong onClick={goBack}>
                Back
            </Text>
        </div>
    );
};

export default BackButton;
