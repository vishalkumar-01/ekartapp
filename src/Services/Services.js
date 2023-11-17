import axios from "axios";

export const getAllProducts = async () => await axios.get("/api/products");

export const getAllCategories = async () => await axios.get("/api/categories");

export const getItemsPresentInCart = async ({ encodedToken }) =>
    axios.get("/api/user/cart", {
        headers: {
            authorization: encodedToken,
        },
    });
export const getItemsPresentInWishlist = async ({ encodedToken }) =>
    axios.get("/api/user/wishlist", {
        headers: {
            authorization: encodedToken,
        },
    });

export const postItemInCart = async ({ product, encodedToken }) => {
    return axios.post(
        "/api/user/cart",
        { product },
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const deleteItemInCart = async ({ product, encodedToken }) => {
    return axios.delete(`/api/user/cart/${product._id}`, {
        headers: {
            authorization: encodedToken,
        },
    });
};

export const incrementItemQuantityInCart = async ({
    product,
    encodedToken,
}) => {
    return axios.post(
        `/api/user/cart/${product._id}`,
        {
            action: {
                type: "increment",
            },
        },
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};
export const decrementItemQuantityInCart = async ({
    product,
    encodedToken,
}) => {
    return axios.post(
        `/api/user/cart/${product._id}`,
        {
            action: {
                type: "decrement",
            },
        },
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const postItemInWishlist = async ({ product, encodedToken }) => {
    return axios.post(
        "/api/user/wishlist",
        { product },
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const deleteItemInWishlist = async ({ product, encodedToken }) => {
    return axios.delete(`/api/user/wishlist/${product._id}`, {
        headers: {
            authorization: encodedToken,
        },
    });
};
