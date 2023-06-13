import Layout from "../Layout/Layout";
import AllPage from "../pages/All-Page/All-Page";
import SavedPage from "../pages/Saved-Page/Saved-Page";
import AboutRecipePage from "../pages/About-Recipe-Page/About-Recipe-Page";
import ErrorPage from "../pages/Error-Page/Error-Page";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
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
