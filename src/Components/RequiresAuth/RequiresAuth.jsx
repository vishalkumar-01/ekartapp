import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { ProductContext } from "../../context/ProductProvider";

const RequiresAuth = ({ children }) => {
    const token = localStorage.getItem("token");

    const location = useLocation();

    // console.log("token:", token);

    return token ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiresAuth;
