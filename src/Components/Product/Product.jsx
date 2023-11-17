import React, { useContext } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthContext";

import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";

import "./Product.css";

import RequiresAuth from "../RequiresAuth/RequiresAuth";

const Product = ({ product }) => {
    const {
        products,
        filters,
        token,
        dispatch,
        cartlist,
        cartHandler,
        wishlistHandler,
        removeItemFromWishlist,
        isItemPresentInCart,
        isItemPresentInWishlist,
    } = useContext(DataContext);

    const { user } = useContext(AuthContext);

    // console.log(user);

    const navigate = useNavigate();

    return (
        <div key={product._id}>
            <div className="card-container">
                <img
                    className="productlist-card-img"
                    src={product.image}
                    alt={product.title}
                    onClick={() => navigate(`/products/${product._id}`)}
                />
                {isItemPresentInWishlist(product) ? (
                    <i
                        className="fa fa-heart wishlisted_btn"
                        aria-hidden="true"
                        onClick={() => removeItemFromWishlist(product)}
                    ></i>
                ) : (
                    <i
                        className="fa fa-heart-o wishlist_btn"
                        aria-hidden="true"
                        onClick={() => wishlistHandler(product)}
                    ></i>
                )}
                <div className="ratings_reviews">
                    <span className="rating">{product.rating}</span>
                    <StarIcon
                        className="star_icon"
                        sx={{ fontSize: "medium" }}
                    />
                    <span className="devider">|</span>
                    <span className="reviews">{product.reviews}</span>
                </div>

                <div onClick={() => navigate(`/products/${product._id}`)}>
                    <div className="product_card_title">{product.title}</div>
                    <div className="product_card_attr">
                        <div className="product_card_price">
                            <span>₹{product.price}</span>
                            <span className="original_price">
                                ₹{product?.origianlPrice}
                            </span>
                        </div>
                        <div>
                            <span>{product?.percentage}% OFF</span>
                        </div>
                    </div>
                </div>
                {/* <div className="btns"> */}
                {isItemPresentInCart(product) ? (
                    <div className="go_to_cart_btn">
                        <Button
                            className="add_to_cart"
                            variant="text"
                            size="small"
                            sx={{
                                width: "100%",
                                color: "#FFF",
                            }}
                            onClick={() => {
                                navigate("/cart");
                            }}
                        >
                            <i
                                className="fa fa-shopping-cart cart-icon"
                                aria-hidden="true"
                            ></i>
                            <span className="btn_content">Go to Cart</span>
                        </Button>

                        {/* <NavLink to="/cart" className="cart-navlink">
                            Go to Cart
                        </NavLink> */}
                    </div>
                ) : (
                    <div
                        className="add_to_cart_btn"
                        onClick={() => cartHandler(product)}
                    >
                        <Button
                            className="add_to_cart"
                            variant="text"
                            size="small"
                            sx={{
                                width: "100%",
                                color: "#FFF",
                            }}
                        >
                            <i
                                className="fa fa-shopping-cart cart-icon"
                                aria-hidden="true"
                            ></i>
                            <span className="btn_content">Add to Cart</span>
                        </Button>
                        {/* <NavLink>Add to Cart</NavLink> */}
                    </div>
                )}
                {/* </div> */}
            </div>
        </div>
    );
};

export default Product;
