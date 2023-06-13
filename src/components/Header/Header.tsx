import type { MenuProps } from "antd";
import { Menu, Button, Typography } from "antd";
import { SaveFilled, OrderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const { Title, Text } = Typography;

const Header = () => {
    const [current, setCurrent] = useState("all");
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

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
            disabled: !isAuthenticated,
        },
    ];

    return (
        <div className="w-full flex justify-between h-20 p-4">
            <Title>LOGO</Title>
            <Menu
                mode="horizontal"
                items={items}
                onClick={onClick}
                selectedKeys={[current]}
            />
            <div className="flex gap-2 items-center">
                {isAuthenticated && (
                    <img className="w-10" src={user?.picture} alt="" />
                )}
                {isAuthenticated && <Text>{user?.email}</Text>}
                {!isAuthenticated && (
                    <Text type="danger">Sign In to unlock Saved page</Text>
                )}
                <Button
                    onClick={() =>
                        !isAuthenticated ? loginWithRedirect() : logout()
                    }
                >
                    {isAuthenticated ? "Sign Out" : "Sign In"}
                </Button>
            </div>
        </div>
    );
};

export default Header;
