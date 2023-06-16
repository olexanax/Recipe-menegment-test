import App from "./components/App/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Auth0Provider
        domain="dev-0ajrskyhs6zvcrn4.us.auth0.com"
        clientId="IyTUUWmlEgSCDGFIDRoDDZbKyHpwT4a0"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>
);
