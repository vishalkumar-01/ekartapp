import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import "./CartProductCard.css";

const CartProductCard = ({ product }) => {
    const {
        products,
        filters,
        token,
        dispatch,
        cartlist,
        cartHandler,
        wishlistHandler,
        removeItemFromCart,
        decrementItemCount,
        incrementItemCount,
        removeItemFromWishlist,
        isItemPresentInCart,
        isItemPresentInWishlist,
    } = useContext(DataContext);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div key={product._id} className="cart__card">
            <div className="cart_card_container">
                <div onClick={() => navigate(`/products/${product._id}`)}>
                    <img
                        className="cart_product_card_img"
                        src={product.image}
                        alt={product.title}
                    />
                </div>

                <div className="cart_item_desc">
                    <div className="cart_item_desc_title">
                        <span>{product.title}</span>
                    </div>
                    <div className="cart_card_attr">
                        <div className="cart_card_price">
                            <b>₹ {product.price}</b>
                            <span className="original_price">
                                ₹{product?.origianlPrice}
                            </span>
                        </div>
                        <div className="discount">
                            <span>{product?.percentage}% OFF</span>
                        </div>
                    </div>

                    <div className="cart_item_qty">
                        <p>Quantity: </p>
                        {product.qty === 1 ? (
                            <div title="Quantity cannot be zero or negative.">
                                <RemoveCircleIcon
                                    className="minus_not_allowed"
                                    sx={{ fontSize: "1.65rem" }}
                                />
                            </div>
                        ) : (
                            <div>
                                <RemoveCircleIcon
                                    className="qty_btns"
                                    onClick={() => decrementItemCount(product)}
                                    sx={{ fontSize: "1.65rem" }}
                                />
                            </div>
                        )}

                        <div>{product.qty}</div>
                        <div>
                            <AddCircleIcon
                                className="qty_btns"
                                onClick={() => incrementItemCount(product)}
                                sx={{ fontSize: "1.65rem" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="cart_item_btns">
                    {isItemPresentInWishlist(product) ? (
                        <div
                            className="add_to_cart_btn"
                            onClick={() => navigate("/wishlist")}
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
                                <span className="btn_content">
                                    GO TO WISHLIST
                                </span>
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="add_to_cart_btn"
                            onClick={() => {
                                wishlistHandler(product);
                                removeItemFromCart(product);
                            }}
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
                                <span className="btn_content">
                                    MOVE TO WISHLIST
                                </span>
                            </Button>
                        </div>
                    )}
                    <div
                        className="add_to_cart_btn"
                        onClick={() => removeItemFromCart(product)}
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
                            <span className="btn_content">
                                REMOVE FROM CART
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;
