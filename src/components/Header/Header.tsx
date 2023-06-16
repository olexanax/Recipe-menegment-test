import type { MenuProps } from "antd";
import { Menu, Button, Typography } from "antd";
import { SaveFilled, OrderedListOutlined } from "@ant-design/icons";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "../../interfaces";
const { Title, Text } = Typography;

const Header = () => {
    const [current, setCurrent] = useState("all");
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const userLoadingStatus = useSelector(
        (state: RootState) => state.currentUser.userLoadingStatus
    );

    const errorMessage =
        isAuthenticated && userLoadingStatus === "error" ? (
            <Text type="danger">Sign in error</Text>
        ) : null;
    const loadingMessage =
        userLoadingStatus === "loading" ? <Text>loading...</Text> : null;
    const userData = isAuthenticated ? (
        <>
            <Text className="hidden sm:block">{user?.email}</Text>
            <img className="w-7 sm:w-10" src={user?.picture} alt="" />
        </>
    ) : null;
    const signInMessage = !isAuthenticated ? (
        <Text type="danger">Sign In to unlock Saved page</Text>
    ) : null;

    return (
        <div className="w-full flex justify-between h-20 p-4">
            <Link to="/" className="sm:block hidden">
                <Title>LOGO</Title>
            </Link>
            <div className="flex gap-8 items-center">
                <NavLink
                    to="/"
                    className="flex items-center gap-1"
                    style={({ isActive }) => ({
                        color: isActive ? "#1890ff" : "inherit",
                    })}
                >
                    <OrderedListOutlined />
                    All
                </NavLink>
                <NavLink
                    to="/saved"
                    className={`flex items-center gap-1 ${
                        !isAuthenticated
                            ? "opacity-80 pointer-events-none"
                            : null
                    }`}
                    style={({ isActive }) => ({
                        color: isActive ? "#1890ff" : "inherit",
                    })}
                >
                    <SaveFilled />
                    Saved
                </NavLink>
                {signInMessage}
            </div>
            <div className="flex gap-2 items-center">
                {errorMessage}
                {loadingMessage}
                {userData}
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
