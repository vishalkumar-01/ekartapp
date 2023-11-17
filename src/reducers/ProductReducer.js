const ProductReducer = (state, action) => {
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
        default:
            break;
    }
};

export default ProductReducer;
