import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import Home from "./Users/Tourist/Home";
import TouristSignIn from "./Users/Tourist/TouristSignIn";
import AgencySignIn from "./Users/Agency/AgencySignIn";
import LoginAs from "./Users/Common/LoginAs";
import AgencyRegister from "./Users/Agency/AgencyRegister";
import AgencyHome from "./Users/Agency/AgencyHome";
import AdminSignIn from "./Users/Admin/AdminSignIn";
import SignUp from "./Users/Tourist/SignUp";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* Tourist Routes */}
            <Route path="/" element={<LoginAs />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tourist-login" element={<TouristSignIn />} />
            <Route path="/tourist-signup" element={<SignUp />} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminSignIn />} />

            {/* Agency Routes */}
            <Route path="/agency-home" element={<AgencyHome />} />

            <Route path="/agency-login" element={<AgencySignIn />} />
            <Route path="/agency-registration" element={<AgencyRegister />} />
        </Route>
    )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
);
