import type { MenuProps } from "antd";
import { Menu, Button, Typography } from "antd";
import { SaveFilled, OrderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title } = Typography;

const items: MenuProps["items"] = [
    {
        label: <Link to="/">All</Link>,
        key: "all",
        icon: <OrderedListOutlined />,
    },
    {
        label: <Link to="/saved">Saved</Link>,
        key: "saved",
        icon: <SaveFilled />,
    },
];

const Header = () => {
    return (
        <div className="w-full flex justify-between h-20 p-4">
            <Title>LOGO</Title>
            <Menu mode="horizontal" items={items} />
            <Button>Log In</Button>
        </div>
    );
};

export default Header;
