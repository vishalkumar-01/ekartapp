import { Routes, Route, NavLink } from "react-router-dom";

import "./App.css";
import Mockman from "mockman-js";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart/Cart";
import Products from "./Pages/Products/Products";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Login from "./Pages/Login/Login";
import RequiresAuth from "./Components/RequiresAuth/RequiresAuth";
import Signup from "./Pages/SignUp/Signup";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Checkout from "./Pages/Checkout/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "./Pages/OrderSummary/OrderSummary";
import RequiresCart from "./Components/RequiresCart/RequiresCart";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/mockman" element={<Mockman />}></Route>
                <Route
                    path="/cart"
                    element={
                        <RequiresAuth>
                            <Cart />
                        </RequiresAuth>
                    }
                ></Route>

                <Route path="/products" element={<Products />}></Route>
                <Route
                    path="/products/:productID"
                    element={<ProductDetails />}
                ></Route>
                <Route
                    path="/wishlist"
                    element={
                        <RequiresAuth>
                            <Wishlist />
                        </RequiresAuth>
                    }
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/user-profile" element={<UserProfile />}></Route>

                <Route
                    path="/checkout"
                    element={
                        <RequiresCart>
                            <Checkout />
                        </RequiresCart>
                    }
                ></Route>

                <Route path="/order-summary" element={<OrderSummary />}></Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
