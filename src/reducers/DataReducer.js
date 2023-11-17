export const DataReducer = (state, action) => {
    switch (action.type) {
        case "get-products-data":
            return { ...state, products: action.payload };

        case "get-categories-data":
            return { ...state, categories: action.payload };

        case "AddEmail":
            return {
                ...state,
                loginForm: { ...state.loginForm, email: action.payload },
            };

        case "AddPassword":
            return {
                ...state,
                loginForm: { ...state.loginForm, password: action.payload },
            };

        case "setToken":
            return { ...state, Authtoken: action.payload };

        case "setTokenToNull":
            return { ...state, Authtoken: action.payload };

        case "handlePriceChange":
            return {
                ...state,
                filters: { ...state.filters, priceRange: action.payload },
            };

        case "Add_Category_Filter":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categories: state.filters.categories.includes(
                        action.payload
                    )
                        ? [
                              ...state.filters.categories.filter(
                                  (str) => str !== action.payload
                              ),
                          ]
                        : [...state.filters.categories, action.payload],
                },
            };

        case "AddCategoryThroughHome":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categories: [action.payload],
                },
            };

        case "Add_Sizes_filter":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sizes: state.filters.sizes.includes(action.payload)
                        ? [
                              ...state.filters.sizes.filter(
                                  (str) => str !== action.payload
                              ),
                          ]
                        : [...state.filters.sizes, action.payload],
                },
            };

        case "clear-all-filters":
            return {
                ...state,
                filters: {
                    sortBy: "",
                    categories: [],
                    rating: "",
                    sizes: [],
                    search: "",
                    priceRange: 0,
                },
            };

        case "handleSearchInput":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    search: action.payload,
                },
            };

        case "handleSortByPrice":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortBy: action.payload,
                },
            };

        case "Add_Rating_filter":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    rating: action.payload,
                },
            };

        //Cart Data cases

        case "get-cart-data":
            return {
                ...state,
                cartlist: [...action.payload.cartlist],
            };

        case "Add-to-Cart":
            return {
                ...state,
                cartlist: [...action.payload.cartlist],
            };
        case "remove-from-cart":
            return {
                ...state,
                cartlist: [...action.payload],
            };
        case "increment-decrement-cart-items":
            return {
                ...state,
                cartlist: [...action.payload.cartlist],
            };

        //Cart Data cases

        case "get-wishlist-data":
            return {
                ...state,
                wishlist: [...action.payload.wishlist],
            };
        case "Add-to-Wishlist":
            return {
                ...state,
                wishlist: [...action.payload.wishlist],
            };
        case "remove-from-wishlist":
            return {
                ...state,
                wishlist: [...action.payload.wishlist],
            };
        case "add-new-address":
            // console.log(action.payload);
            return {
                ...state,
                addresses: [...action.payload],
            };
        case "REMOVE_ADDRESS":
            // console.log(action.payload);
            return {
                ...state,
                addresses: [...action.payload],
            };
        case "EDIT_ADDRESS":
            // console.log(action.payload);
            return {
                ...state,
                addresses: [...action.payload],
            };

        case "SET_ORDER_OBJ":
            return {
                ...state,
                orderObj: {
                    boughtItems: [...action.payload.currentCartItems],
                    addressToDeliver: action.payload.selectedAddress,
                    totalOrderValue: Number(action.payload.totalOrderValue),
                },
            };
        case "ORDER_PLACED":
            return {
                ...state,
                cartlist: action.payload.cartlist,
                order_summary: [
                    ...state.order_summary,
                    action.payload.currentOrder,
                ],
            };
        case "CHANGE_PAGINATION_FILTERS":
            return {
                ...state,
                paginationData: {
                    ...state.paginationData,
                    from: action.payload.from,
                    to: action.payload.to,
                },
            };
        default:
            return state;
    }
};

// siddhant.bhadke.1607@gmail.com
// i7xbl
