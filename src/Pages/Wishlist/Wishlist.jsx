import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import Header from "../../Components/Header/Header";
import { NavLink } from "react-router-dom";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";

import "./Wishlist.css";

const Wishlist = () => {
    const {
        wishlist,
        isItemPresentInCart,
        cartHandler,
        isItemPresentInWishlist,
        removeItemFromWishlist,
        wishlistHandler,
    } = useContext(DataContext);

    return (
        <div>
            <Header />
            <div className="wishlist_main_Container">
                <h2 className="cart_total">MY WISHLIST ({wishlist.length})</h2>
                {wishlist.length === 0 ? (
                    <div>
                        <img
                            className="empty_wishlist"
                            src="https://res.cloudinary.com/dwegb6a4s/image/upload/v1690053520/My_wishlist_yltjjo.png"
                            alt="empty-cart-img"
                        />
                        <div className="wishlist_warn">
                            <h3>Your Wishlist is empty!</h3>
                            <NavLink
                                className="explore_products"
                                to="/products"
                            >
                                Explore
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <div className="products__page__container">
                        <div className="productlist-main-cards-container">
                            {wishlist.map((product) => (
                                <Product product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Wishlist;
