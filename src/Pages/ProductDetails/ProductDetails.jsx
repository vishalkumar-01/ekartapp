import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import Header from "../../Components/Header/Header";
import "./ProductDetails.css";
import Footer from "../../Components/Footer/Footer";

import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";

const ProductDetails = () => {
    const { productID } = useParams();
    const navigate = useNavigate();
    const { products } = useContext(DataContext);

    const Product = products.find((pro) => pro._id === productID);

    const {
        isItemPresentInCart,
        isItemPresentInWishlist,
        cartHandler,
        removeItemFromWishlist,
        wishlistHandler,
    } = useContext(DataContext);

    // console.log(Product);

    return (
        <div>
            <Header />
            <main className="single_product_main_container">
                <div className="single_product_image_container">
                    <img src={Product.image} alt={Product.title} />
                    {isItemPresentInWishlist(Product) ? (
                        <i
                            className="fa fa-heart single_product_wishlisted_btn"
                            aria-hidden="true"
                            onClick={() => removeItemFromWishlist(Product)}
                        ></i>
                    ) : (
                        <i
                            className="fa fa-heart-o single_product_wishlist_btn"
                            aria-hidden="true"
                            onClick={() => wishlistHandler(Product)}
                        ></i>
                    )}
                </div>
                <div className="single_product_content_container">
                    <h2>{Product.title}</h2>
                    <div className="single_product_user_review">
                        <div className="single_product_user_rating">
                            <span>{Product.rating}</span>
                            <StarIcon
                                className="star_icon"
                                sx={{
                                    fontSize: "medium",
                                    color: "#FFF",
                                    m: "0.15rem",
                                }}
                            />
                        </div>
                        <div>
                            <p>({Product.reviews} Customer Reviews) </p>
                        </div>
                    </div>
                    <div className="product_card_attributes">
                        <div className="product_card_price">
                            <span className="product_card_price_1">
                                ₹{Product.price}
                            </span>
                            <span className="original_price">
                                ₹{Product?.origianlPrice}
                            </span>
                        </div>
                        <div>
                            <span>({Product?.percentage}% OFF)</span>
                        </div>
                    </div>
                    <div className="product_card_desc">
                        {Product.description}
                    </div>
                    <div className="single_product_card_availability">
                        <b>Availability:</b>
                        {Product.instock ? (
                            <span>In Stock</span>
                        ) : (
                            <span>Out of Stock</span>
                        )}
                    </div>
                    <div className="single_product_card_shipping">
                        <b>Shipping Available:</b>
                        {Product.instock ? <span>Yes</span> : <span>No</span>}
                    </div>
                    <div className="single_product_card_category">
                        <b>Categoy:</b>
                        <span>
                            {Product.category.substring(0, 1).toUpperCase() +
                                Product.category.substring(1)}
                        </span>
                    </div>
                    <div className="single_product_card_brand">
                        <b>Brand:</b>
                        <span>{Product.brand}</span>
                    </div>
                    <hr />
                    {isItemPresentInCart(Product) ? (
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
                            onClick={() => cartHandler(Product)}
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;
