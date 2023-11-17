import React, { useContext } from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const Banner = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(DataContext);

    return (
        <section
            className="banner-container"
            onClick={() => {
                navigate("/products");
                dispatch({ type: "clear-all-filters" });
            }}
        >
            <img
                className="banner_hero_img"
                src="https://res.cloudinary.com/dwegb6a4s/image/upload/v1690200985/Banner4_nyjtep.jpg"
                alt=""
            />
        </section>
    );
};

export default Banner;
