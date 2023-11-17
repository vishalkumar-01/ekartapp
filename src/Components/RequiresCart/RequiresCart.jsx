import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Navigate, useLocation } from "react-router-dom";

const RequiresCart = ({ children }) => {
    const { cartlist } = useContext(DataContext);

    const location = useLocation();

    return cartlist.length !== 0 ? (
        children
    ) : (
        <Navigate to="/products" state={{ from: location }} />
    );
};

export default RequiresCart;
