import axios from "axios";
import {
    createContext,
    useReducer,
    useEffect,
    useState,
    useContext,
} from "react";
import { DataReducer } from "../reducers/DataReducer";

import {
    getAllCategories,
    getAllProducts,
    getItemsPresentInCart,
    postItemInCart,
    deleteItemInCart,
    incrementItemQuantityInCart,
    decrementItemQuantityInCart,
    postItemInWishlist,
    getItemsPresentInWishlist,
    deleteItemInWishlist,
} from "../Services/Services";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ReactToastify } from "../Utility/ReactTostify";

export const DataContext = createContext();

const initialState = {
    filters: {
        sortBy: "",
        categories: [],
        rating: "",
        sizes: [],
        search: "",
        priceRange: 1500,
    },
    order_summary: [],
    orderObj: { boughtItems: [], addressToDeliver: "", totalOrderValue: "" },
    addresses: [
        {
            id: 1,
            address_line_1: "Thottagiri Road",
            address_line_2: "Alasanatham",
            city: "Hosur",
            state: "TamilNadu",
            pincode: "635109",
        }
    ],
    products: [],
    wishlist: [],
    cartlist: [],
    categories: [],
    loginForm: {
        email: "",
        password: "",
    },
    Authtoken: null,
    paginationData: {
        from: 0,
        to: 8,
        pageSize: 8,
    },
};

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState);
    const [selectedAddress, setSelectedAddress] = useState();
    const [flag, setFlag] = useState(false);

    const {
        products,
        loginForm,
        categories,
        filters,
        cartlist,
        wishlist,
        addresses,
        orderObj,
        order_summary,
        paginationData,
    } = state;
    const { user, token, setToken, setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     console.log("order_summary:", order_summary);
    // }, [order_summary]);
    // useEffect(() => {
    //     console.log("location:", location);
    // }, [location]);

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const allProductsResult = await getAllProducts();
                dispatch({
                    type: "get-products-data",
                    payload: allProductsResult.data.products,
                });
                const allCategoriesResult = await getAllCategories();
                dispatch({
                    type: "get-categories-data",
                    payload: allCategoriesResult.data.categories,
                });

                // I am creating all these api services in services.js file and calling all the apis from this file but its not working for cart.

                // using this getItemsPresentInCart and dispatch function here in this file, I am not able to store the given item in cart whereas if i use the same function in cart.jsx then it is working.

                // this is rendering only once and that as well at the beginning of the coode/project that's why it is not adding value in cartlist/cartItems.

                if (token) {
                    const allCartItemsResult = await getItemsPresentInCart({
                        encodedToken: token,
                    });

                    // console.log(allCartItemsResult);

                    if (
                        allCartItemsResult.status === 200 ||
                        allCartItemsResult.status === 201
                    ) {
                        // console.log("Working");
                        // console.log(allCartItemsResult);
                        dispatch({
                            type: "get-cart-data",
                            payload: {
                                cartlist: allCartItemsResult?.data?.cart,
                            },
                        });
                    }
                } else {
                    dispatch({
                        type: "get-cart-data",
                        payload: { cartlist: [] },
                    });
                }
                if (token) {
                    const allWishlistItemsResult =
                        await getItemsPresentInWishlist({
                            encodedToken: token,
                        });
                    if (
                        allWishlistItemsResult.status === 200 ||
                        allWishlistItemsResult.status === 201
                    ) {
                        // console.log("Working");
                        // console.log(allWishlistItemsResult);
                        dispatch({
                            type: "get-wishlist-data",
                            payload: {
                                wishlist:
                                    allWishlistItemsResult?.data?.wishlist,
                            },
                        });
                    }
                } else {
                    dispatch({
                        type: "get-wishlist-data",
                        payload: { wishlist: [] },
                    });
                }
            };
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    }, [token]);

    const loginAsGuest = async (e) => {
        e.preventDefault();
        // setLoading(true);
        // console.log("Hello");
        try {
            const data = {
                email: "adarshbalika@gmail.com",
                password: "adarshbalika",
            };
            const result = await axios.post(`/api/auth/login`, data);
            // console.log(result);
            if (result.status === 200 || result.status === 201) {
                localStorage.setItem("token", result.data.encodedToken);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setToken(result.data.encodedToken);
                setUser(result.data.user);
                // setLoading(false);
                ReactToastify("Logged in Successfully as Guest", "success");
                // clearState();
                // console.log(location);
                if (location.state === null) {
                    navigate("/products");
                } else {
                    navigate(location?.state?.from?.pathname);
                }
            } else {
                // ReactToastify(
                //     "Something went wrong, Please try again!",
                //     "error"
                // );
            }
        } catch (error) {
            error?.response?.data?.errors?.map((e) =>
                // ReactToastify(e, "error")
                console.log(error)
            );
        }
    };

    const totalCartValue = cartlist.reduce(
        (acc, curr) => acc + curr.qty * curr.price,
        0
    );

    const isItemPresentInCart = (product) =>
        cartlist.find((productItem) => productItem._id === product._id);

    const isItemPresentInWishlist = (product) =>
        wishlist.find((productItem) => productItem._id === product._id);

    // useEffect(() => {});

    const inputSearchedProducts =
        filters.search.length > 0
            ? products.filter((item) =>
                  item.title
                      .toLowerCase()
                      .includes(filters?.search?.toLowerCase())
              )
            : [];

    // useEffect(() => {
    //     console.log("inputSearchedProducts", inputSearchedProducts);
    // }, [inputSearchedProducts]);

    const wishlistHandler = async (product) => {
        if (!token) {
            navigate("/login");
        } else {
            // console.log("hello2");
            try {
                const result = await postItemInWishlist({
                    product: { ...product },
                    encodedToken: token,
                });
                // console.log("addToWishlist Result", result);
                if (result.status === 200 || result.status === 201) {
                    dispatch({
                        type: "Add-to-Wishlist",
                        payload: { wishlist: result.data.wishlist },
                    });
                }
                ReactToastify("Successfully added to wishlist", "success");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const removeItemFromWishlist = async (product) => {
        try {
            const result = await deleteItemInWishlist({
                product: { ...product, qty: 1 },
                encodedToken: token,
            });
            console.log("removeFromWishlist Result", result);
            if (result.status === 200 || result.status === 201) {
                dispatch({
                    type: "remove-from-wishlist",
                    payload: { wishlist: result.data.wishlist },
                });
            }
            ReactToastify("Removed from wishlist", "warn");
        } catch (error) {
            console.log(error);
        }
    };

    const cartHandler = async (product) => {
        // console.log(product);
        try {
            if (!token) {
                navigate("/login");
            } else {
                // const isItemPresent = cartlist.find(
                //     (productItem) => productItem._id === product._id
                // );

                // console.log(isItemPresent);

                const result = await postItemInCart({
                    product: { ...product, qty: 1 },
                    encodedToken: token,
                });

                // console.log(result);

                // console.log("addToCart Result", result);
                if (result.status === 200 || result.status === 201) {
                    dispatch({
                        type: "Add-to-Cart",
                        payload: { cartlist: result.data.cart },
                    });
                }
                ReactToastify("Successfully added to cart", "success");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeItemFromCart = async (product) => {
        try {
            const result = await deleteItemInCart({
                product: { ...product, qty: 1 },
                encodedToken: token,
            });
            // console.log("removeFromCart Result", result);
            if (result.status === 200 || result.status === 201) {
                dispatch({
                    type: "remove-from-cart",
                    payload: result.data.cart,
                });
            }
            ReactToastify("Removed from cart", "warn");
        } catch (error) {
            console.log(error);
        }
    };

    const incrementItemCount = async (product) => {
        try {
            const result = await incrementItemQuantityInCart({
                product: { ...product },
                encodedToken: token,
            });
            if (result.status === 200 || result.status === 201) {
                dispatch({
                    type: "increment-decrement-cart-items",
                    payload: { cartlist: result.data.cart },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const decrementItemCount = async (product) => {
        try {
            const result = await decrementItemQuantityInCart({
                product: { ...product },
                encodedToken: token,
            });
            if (result.status === 200 || result.status === 201) {
                dispatch({
                    type: "increment-decrement-cart-items",
                    payload: { cartlist: result.data.cart },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveAddress = (addressToBeRemoved) => {
        const updatedAddresses = addresses.filter(
            (address) => address.id !== addressToBeRemoved.id
        );
        dispatch({
            type: "REMOVE_ADDRESS",
            payload: updatedAddresses,
        });
        // console.log(updatedAddresses);
    };

    return (
        <DataContext.Provider
            value={{
                count: 3,
                state,
                dispatch,
                products,
                loginForm,
                token,
                categories,
                filters,
                cartlist,
                wishlist,
                setToken,
                addresses,
                orderObj,
                selectedAddress,
                inputSearchedProducts,
                order_summary,
                flag,
                setFlag,
                setSelectedAddress,
                cartHandler,
                removeItemFromCart,
                incrementItemCount,
                decrementItemCount,
                isItemPresentInCart,
                wishlistHandler,
                removeItemFromWishlist,
                isItemPresentInWishlist,
                loginAsGuest,
                handleRemoveAddress,
                totalCartValue,
                paginationData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
