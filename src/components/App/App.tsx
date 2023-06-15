import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import {
    fetchCurrentUser,
    setCurrentUser,
    deleteCurrentUser,
} from "../../slices/currentUserSlice";
import { RootState, User } from "../../interfaces";

import Layout from "../Layout/Layout";
import AllPage from "../pages/All-Page/All-Page";
import SavedPage from "../pages/Saved-Page/Saved-Page";
import AboutRecipePage from "../pages/About-Recipe-Page/About-Recipe-Page";
import ErrorPage from "../pages/Error-Page/Error-Page";
import { AppDispatch } from "../../interfaces";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const { isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const { request } = useHttp();

    useEffect(() => {
        if (isAuthenticated) {
            request(`https://6488bf090e2469c038fe4bc4.mockapi.io/users`)
                .then((res) => {
                    if (
                        res.some(
                            (someuser: User) => someuser.name === user?.name
                        )
                    ) {
                        dispatch(
                            fetchCurrentUser(
                                res.find(
                                    (someuser: User) =>
                                        someuser.name === user?.name
                                ).id
                            )
                        );
                    } else {
                        const newUser: User = {
                            mail: user?.email || "mail",
                            name: user?.name || "name",
                            savedRecipes: [],
                            ownReciptes: [],
                            id: user?.email || "mail",
                        };
                        request(
                            `https://6488bf090e2469c038fe4bc4.mockapi.io/users`,
                            "POST",
                            JSON.stringify(newUser)
                        )
                            .then(() => dispatch(setCurrentUser(newUser)))
                            .catch((e) => {
                                throw new Error(e);
                            });
                    }
                })
                .catch((e) => {
                    throw new Error(e);
                });
        } else {
            dispatch(deleteCurrentUser());
        }
    }, [isAuthenticated]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AllPage />} />
                    <Route path="saved" element={<SavedPage />} />
                    <Route
                        path="recipt/:reciptId"
                        element={<AboutRecipePage />}
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
