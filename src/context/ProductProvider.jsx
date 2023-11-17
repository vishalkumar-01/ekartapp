import { createContext, useEffect, useReducer } from "react";
import ProductReducer from "../reducers/ProductReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, {
        products: [],
        categories: [],
        loginForm: {
            email: "",
            password: "",
        },
        Authtoken: null,
    });

    const { products, loginForm, Authtoken, categories } = state;

    // console.log("categories:", categories);

    // useEffect(() => {
    //     try {
    //         const fetchProducts = async () => {
    //             const allProducts = await getAllProducts();
    //             dispatch({
    //                 type: "get-products-data",
    //                 payload: allProducts.data.products,
    //             });
    //             const allCategories = await getAllCategories();
    //             dispatch({
    //                 type: "get-categories-data",
    //                 payload: allCategories.data.categories,
    //             });
    //         };
    //         fetchProducts();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    // const loginFunc = (creds) => {
    //     try {
    //         const fetchData = async () => {
    //             const response = await fetch("/api/auth/login", {
    //                 method: "POST",
    //                 body: JSON.stringify(creds),
    //             });
    //             const data = await response.json();
    //             const { encodedToken } = data;
    //             localStorage.setItem("encodedToken", encodedToken);
    //         };

    //         fetchData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     console.log("Authtoken:", Authtoken);
    // }, [Authtoken]);

    return (
        <ProductContext.Provider
            value={{
                count: 3,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
