import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./header.css";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthContext";

import PageviewIcon from "@mui/icons-material/Pageview";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
    const token = localStorage.getItem("token");

    const [flag, setFlag] = useState(false);

    const navigate = useNavigate();
    const { dispatch, inputSearchedProducts, filters, cartlist, wishlist } =
        useContext(DataContext);

    const handleLogout = () => {
        // console.log("logout");
        navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // useEffect(() => {
    //     console.log("inputSearchedProducts", inputSearchedProducts);
    // }, [inputSearchedProducts]);
    // useEffect(() => {
    //     console.log("flag", flag);
    // }, [flag]);

    return (
        <nav className="navigation">
            <div className="navigation_desktop">
                <section
                    className="nav-left-section"
                    onClick={() => navigate("/")}
                >
                    <img
                        className="hero_logo"
                        src="https://res.cloudinary.com/dwegb6a4s/image/upload/v1690205577/main_tmyhpx.jpg"
                        alt="hero_logo"
                    />
                    <div className="hero_title">
                        <h1>Fashion</h1>
                        <h1>Fusion</h1>
                    </div>
                </section>

                {/* <form action=""> */}
                <div className="searchbar_container nav_desktop">
                    <div className="searchbar_input">
                        <input
                            type="text"
                            className="search__input"
                            placeholder="Search..."
                            value={filters.search}
                            onChange={(e) => {
                                dispatch({
                                    type: "handleSearchInput",
                                    payload: e.target.value,
                                });
                            }}
                            onClick={() => setFlag((prev) => !prev)}
                        />
                        <SearchIcon
                            sx={{
                                padding: "8px",
                                bgcolor: "#F0F4F8",
                                height: "100%",
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                            }}
                        />
                    </div>

                    <section
                        className="searched_products_container"
                        onClick={() => setFlag((prev) => !prev)}
                        // onMouseEnter={() =>
                        //     setTimeout(() => {
                        //         setFlag((prev) => !prev);
                        //     }, 0)
                        // }
                    >
                        {flag ? (
                            <div>
                                {inputSearchedProducts.length === 0 ? (
                                    <div>
                                        <p>No item to show</p>
                                    </div>
                                ) : (
                                    <div>
                                        {inputSearchedProducts.length > 5 ? (
                                            <div>
                                                {inputSearchedProducts
                                                    .slice(0, 5)
                                                    .map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className="searched_products"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: "handleSearchInput",
                                                                    payload: "",
                                                                });
                                                                navigate(
                                                                    `/products/${product._id}`
                                                                );
                                                            }}
                                                        >
                                                            <div className="searched_products_left">
                                                                <PageviewIcon
                                                                    sx={{
                                                                        color: "#FF3E6C",
                                                                    }}
                                                                />
                                                                <span>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </span>
                                                            </div>
                                                            <span>
                                                                ₹{" "}
                                                                {product.price}
                                                            </span>
                                                        </div>
                                                    ))}
                                                <div className="searched_products">
                                                    <div className="searched_products_left view_all">
                                                        <PageviewIcon
                                                            sx={{
                                                                color: "#FF3E6C",
                                                            }}
                                                        />
                                                        <span
                                                            onClick={() => {
                                                                navigate(
                                                                    "/products"
                                                                );
                                                            }}
                                                        >
                                                            View all products
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {inputSearchedProducts
                                                    .slice(0, 5)
                                                    .map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className="searched_products"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: "handleSearchInput",
                                                                    payload: "",
                                                                });
                                                                navigate(
                                                                    `/products/${product._id}`
                                                                );
                                                            }}
                                                        >
                                                            <div className="searched_products_left">
                                                                <PageviewIcon
                                                                    sx={{
                                                                        color: "#FF3E6C",
                                                                    }}
                                                                />
                                                                <span>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </span>
                                                            </div>
                                                            <span>
                                                                ₹{" "}
                                                                {product.price}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : null}

                        {/* {flag ? (
                        <div>
                            {inputSearchedProducts.length === 0 ? (
                                <p>No item to show</p>
                                ) : {inputSearchedProducts.length > 5 ? (
                        <div>
                            {inputSearchedProducts
                                .slice(0, 5)
                                .map((product) => (
                                    <div
                                        key={product.id}
                                        className="searched_products"
                                        onClick={() =>
                                            navigate(`/products/${product._id}`)
                                        }
                                    >
                                        <div className="searched_products_left">
                                            <PageviewIcon
                                                sx={{ color: "#FF3E6C" }}
                                            />
                                            <span>{product.title}</span>
                                        </div>
                                        <span>₹ {product.price}</span>
                                    </div>
                                ))}

                            <div className="searched_products">
                                <div className="searched_products_left view_all">
                                    <PageviewIcon sx={{ color: "#FF3E6C" }} />
                                    <span>View all products</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        inputSearchedProducts
                            .slice(0, 5)
                            .map((product, index) => (
                                <div
                                    key={product.id}
                                    className="searched_products"
                                    onClick={() =>
                                        navigate(`/products/${product._id}`)
                                    }
                                >
                                    <div className="searched_products_left">
                                        <PageviewIcon
                                            sx={{ color: "#FF3E6C" }}
                                        />
                                        <span>{product.title}</span>
                                    </div>
                                    <span>₹ {product.price}</span>
                                </div>
                            ))
                    )
                }}



                        </div> : null
                    } */}
                    </section>
                </div>

                {/* </form> */}

                <section className="nav-right-section">
                    <ul className="nav-links">
                        <li
                            className="nav-link-item nav-explore"
                            onClick={() => navigate("/products")}
                        >
                            Explore
                        </li>
                        <div className="wishlist-nav-btn">
                            <li
                                className="nav-link-item"
                                onClick={() => navigate("/wishlist")}
                            >
                                <i
                                    className="fa fa-heart-o fa-lg"
                                    aria-hidden="true"
                                ></i>
                            </li>
                            {wishlist.length === 0 ? (
                                ""
                            ) : (
                                <div className="cart_items_count">
                                    {wishlist.length}
                                </div>
                            )}
                        </div>
                        <div className="cart-nav-btn">
                            <li
                                className="nav-link-item"
                                onClick={() => navigate("/cart")}
                            >
                                <i
                                    className="fa fa-shopping-cart fa-lg"
                                    aria-hidden="true"
                                ></i>
                            </li>
                            {cartlist.length === 0 ? (
                                ""
                            ) : (
                                <div className="cart_items_count">
                                    {cartlist.length}
                                </div>
                            )}
                        </div>

                        {!token && (
                            <li
                                className="nav-link-item login_btn"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </li>
                        )}

                        {/* {token ? (
                        <li className="nav-link-item" onClick={handleLogout}>
                            Logout
                        </li>
                    ) : (
                        ""
                    )} */}

                        {token ? (
                            <i
                                className="fa fa-user-circle-o fa-lg nav-link-item"
                                aria-hidden="true"
                                onClick={() => navigate("/user-profile")}
                            ></i>
                        ) : (
                            ""
                        )}
                    </ul>
                </section>
            </div>

            <div className="searchbar_container nav_mobile">
                <div className="searchbar_input">
                    <input
                        type="text"
                        className="search__input"
                        placeholder="Search..."
                        value={filters.search}
                        onChange={(e) => {
                            dispatch({
                                type: "handleSearchInput",
                                payload: e.target.value,
                            });
                        }}
                        onClick={() => setFlag((prev) => !prev)}
                    />
                    <SearchIcon
                        sx={{
                            padding: "8px",
                            bgcolor: "#F0F4F8",
                            height: "100%",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                        }}
                    />
                </div>

                <section
                    className="searched_products_container"
                    onClick={() => setFlag((prev) => !prev)}
                    // onMouseEnter={() =>
                    //     setTimeout(() => {
                    //         setFlag((prev) => !prev);
                    //     }, 0)
                    // }
                >
                    {flag ? (
                        <div>
                            {inputSearchedProducts.length === 0 ? (
                                <div>
                                    <p>No item to show</p>
                                </div>
                            ) : (
                                <div>
                                    {inputSearchedProducts.length > 5 ? (
                                        <div>
                                            {inputSearchedProducts
                                                .slice(0, 5)
                                                .map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="searched_products"
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "handleSearchInput",
                                                                payload: "",
                                                            });
                                                            navigate(
                                                                `/products/${product._id}`
                                                            );
                                                        }}
                                                    >
                                                        <div className="searched_products_left">
                                                            <PageviewIcon
                                                                sx={{
                                                                    color: "#FF3E6C",
                                                                }}
                                                            />
                                                            <span>
                                                                {product.title}
                                                            </span>
                                                        </div>
                                                        <span>
                                                            ₹ {product.price}
                                                        </span>
                                                    </div>
                                                ))}
                                            <div className="searched_products">
                                                <div className="searched_products_left view_all">
                                                    <PageviewIcon
                                                        sx={{
                                                            color: "#FF3E6C",
                                                        }}
                                                    />
                                                    <span
                                                        onClick={() => {
                                                            navigate(
                                                                "/products"
                                                            );
                                                        }}
                                                    >
                                                        View all products
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {inputSearchedProducts
                                                .slice(0, 5)
                                                .map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="searched_products"
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "handleSearchInput",
                                                                payload: "",
                                                            });
                                                            navigate(
                                                                `/products/${product._id}`
                                                            );
                                                        }}
                                                    >
                                                        <div className="searched_products_left">
                                                            <PageviewIcon
                                                                sx={{
                                                                    color: "#FF3E6C",
                                                                }}
                                                            />
                                                            <span>
                                                                {product.title}
                                                            </span>
                                                        </div>
                                                        <span>
                                                            ₹ {product.price}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null}
                </section>
            </div>
        </nav>
    );
};

export default Header;
