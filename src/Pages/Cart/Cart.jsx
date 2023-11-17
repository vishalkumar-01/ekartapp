import React, { useContext, useEffect } from "react";
import Header from "../../Components/Header/Header";
import { DataContext } from "../../context/DataProvider";

import "./Cart.css";
import Product from "../../Components/Product/Product";
import { NavLink } from "react-router-dom";
import CartProductCard from "../../Components/CartProductCard/CartProductCard";
import Footer from "../../Components/Footer/Footer";

const Cart = () => {
    const token = JSON.parse(localStorage.getItem("UserDetails"))?.encodedToken;

    const {
        cartlist,
        dispatch,
        removeItemFromCart,
        wishlistHandler,
        incrementItemCount,
        decrementItemCount,
        totalCartValue,
        isItemPresentInWishlist,
        removeItemFromWishlist,
    } = useContext(DataContext);

    // const handleIncrement = (product) => {
    //     const newCartlist = cartlist.map((cartItem) =>
    //         cartItem._id === product._id
    //             ? { ...cartItem, qty: cartItem.qty + 1 }
    //             : cartItem
    //     );

    //     console.log(newCartlist);
    // };

    // console.log("local cartlist", cartlist);

    // useEffect(() => {
    //     console.log("local cartlist:", cartlist);
    // }, [cartlist]);

    // useEffect(() => {
    //     try {
    //         const fetchData = async () => {
    //             const allCartItemsResult = await getItemsPresentInCart({
    //                 encodedToken: token,
    //             });
    //             if (
    //                 allCartItemsResult.status === 200 ||
    //                 allCartItemsResult.status === 201
    //             ) {
    //                 dispatch({
    //                     type: "get-cart-data",
    //                     payload: allCartItemsResult.data.cart,
    //                 });
    //             }
    //         };

    //         fetchData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    return (
        <div>
            <Header />
            {cartlist.length === 0 ? (
                <div className="cart_main_Container">
                    <h2 className="cart_total">MY CART ({cartlist.length})</h2>
                    <img
                        className="empty_cart"
                        src="https://res.cloudinary.com/dwegb6a4s/image/upload/v1689681810/empty_cart_2_b8rb9k.png"
                        alt="empty-cart-img"
                    />
                    <div className="cart_warn">
                        <h3>Your Cart is empty!</h3>
                        <NavLink className="explore_products" to="/products">
                            Explore
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="cart_main_Container">
                    <div>
                        <h2 className="cart_total">
                            MY CART ({cartlist.length})
                        </h2>
                    </div>
                    <div className="cart__details">
                        <div className="cart__page__container">
                            {cartlist.map((product) => (
                                <div
                                    className="cart-main-cards-container"
                                    key={product.id}
                                >
                                    <CartProductCard product={product} />
                                </div>
                            ))}
                        </div>
                        <div className="cart__price__details">
                            <h2 className="cart__price__details__title">
                                Cart Price Details
                            </h2>
                            <hr />
                            {cartlist.map((cartItem) => (
                                <div
                                    key={cartItem.id}
                                    className="cart__price__item"
                                >
                                    <div>
                                        {cartItem.title} ({cartItem.qty})
                                    </div>

                                    <div>₹ {cartItem.qty * cartItem.price}</div>
                                </div>
                            ))}

                            <hr />
                            <p>Total Price: {totalCartValue.toFixed(2)}</p>
                            <NavLink to="/checkout" className="checkout__btn">
                                Checkout
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}

            {/** 
            <div class="card-container card-container-shadow productlist-card brd-rd-semi-sq false">
                <div class="card-img-container cursor-pointer">
                    <img
                        class="card-img productlist-card-img brd-rd-semi-sq"
                        src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648516571/fashify/25d7ff1d-6680-4629-b7f8-dda51fb89dc61592396707535-Nautica-Men-Tshirts-3811592396706267-4_hxanis.webp"
                        alt="card "
                    ></img>
                    <button class="card-img-tag-btn productlist-card-img-tag-btn-container">
                        <span class="material-icons productlist-card-img-tag-btn">
                            favorite_border
                        </span>
                    </button>
                    <div class="productlist-card-rating-container">
                        <i class="fas fa-star"></i>
                        <p>3.9</p> | <p>2.9k</p>
                    </div>
                    <div class="productlist-card-size-container">
                        <p>L</p>
                    </div>
                </div>
                <div class="card-content product-card-content">
                    <div class="product-card-text">
                        <div class="product-card-title cursor-pointer">
                            Louis Philippe Sport
                        </div>
                        <div class="product-card-price-container">
                            <p>₹719</p>
                            <p class="product-card-original-price">₹1199</p>
                            <p class="product-card-discount">40% OFF</p>
                        </div>
                    </div>
                    <div class="card-footer-elements">
                        <button class="btn btn-primary brd-rd-semi-sq background-primary">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>
                    </div>
                </div>
            </div>
        */}
            <Footer />
        </div>
    );
};

export default Cart;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjZmE3MmRiMi05NTQ4LTQxNTQtYjJkMS1mNjY2NDU0YjIzY2YiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.uIGcAKUXkUnQqLrhs6fWjZVvycN3jgWiDpHR7g-N8vo
