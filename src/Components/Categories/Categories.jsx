import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Categories.css";
import { DataContext } from "../../context/DataProvider";

const Categories = () => {
    const { categories, dispatch } = useContext(DataContext);

    const navigate = useNavigate();

    const handleCategoryClick = (value) => {
        navigate(`/products`);
        console.log(value);
        dispatch({ type: "AddCategoryThroughHome", payload: value });
    };

    return (
        <div className="category_main_container">
            <div className="category_main_container_header">
                <h1>Categories</h1>
                <div className="title_underline"></div>
            </div>
            <section className="home-cards">
                {categories.map((category) => (
                    <div
                        className="card__container"
                        key={category._id}
                        onClick={() => handleCategoryClick(category.routeName)}
                    >
                        <div className="card__img__container">
                            <img
                                className="card__img"
                                src={category.categoryImg}
                                alt={category.routeName}
                            />
                        </div>
                        <div className="card__text">
                            <div className="card__text__heading">
                                New Arrival
                            </div>
                            <div>
                                <h2>{category.routeName} Collection</h2>
                                <p>{category.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Categories;
