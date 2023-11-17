import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { DataContext } from "../../context/DataProvider";
import { ReactToastify } from "../../Utility/ReactTostify";

import "./Checkout.css";
import Button from "@mui/material/Button";
import CreateNewAddressModal from "../UserProfile/CreateNewAddress/CreateNewAddressModal";
import { useNavigate } from "react-router-dom";
import { deleteItemInCart } from "../../Services/Services";
import { AuthContext } from "../../context/AuthContext";

const Checkout = () => {
    const navigate = useNavigate();

    const { user, token } = useContext(AuthContext);

    const {
        cartlist,
        totalCartValue,
        addresses,
        selectedAddress,
        setSelectedAddress,
        orderObj,
        dispatch,
        order_summary,
    } = useContext(DataContext);

    useEffect(() => {
        console.log("order_summary", order_summary);
    }, [order_summary]);
    // useEffect(() => {
    //     console.log("selectedAddress", selectedAddress);
    // }, [selectedAddress]);

    useEffect(() => {
        dispatch({
            type: "SET_ORDER_OBJ",
            payload: {
                selectedAddress: selectedAddress,
                currentCartItems: [...cartlist],
                totalOrderValue:
                    totalCartValue.toFixed(2) -
                    (totalCartValue * 40) / 100 +
                    40,
            },
        });
    }, [selectedAddress, cartlist]);

    const clearCart = async (item, token) => {
        try {
            const res = await deleteItemInCart({
                product: item,
                encodedToken: token,
            });
            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const removeAllCartItems = () => {
        let cart = null;
        cartlist.forEach((element) => {
            cart = clearCart(element, token);
        });
    };

    const loadScript = async (url) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = url;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            ReactToastify(
                "Razorpay SDK failed to load, check you connection",
                "error"
            );
            return;
        }

        const options = {
            key: "rzp_test_I9ZAQpadkek2ay",
            amount: totalCartValue * 100,
            currency: "INR",
            name: "FashionFusion",
            description: "Thank you for shopping with us",
            image: "https://res.cloudinary.com/dwegb6a4s/image/upload/v1690205577/main_tmyhpx.jpg",
            handler: function (response) {
                navigate("/order-summary");
                dispatch({
                    type: "ORDER_PLACED",
                    payload: {
                        cartlist: [],
                        currentOrder: orderObj,
                        id: response.razorpay_payment_id,
                    },
                });
                setSelectedAddress();
                removeAllCartItems();
            },
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                contact: "7058693670",
            },
            theme: {
                color: "#2B51E1",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            ReactToastify("Please select the address", "info");
        } else {
            displayRazorpay();
            // console.log("Order Placed");
        }
    };

    const isAddressSelected = (address) => selectedAddress?.id === address?.id;
    // console.log(isAddressSelected({ id: 2 }));
    return (
        <div>
            <Header />

            <div className="checkout_container">
                <div className="address_details">
                    <h2>Address Details</h2>
                    {addresses &&
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className="address_card"
                                onClick={() => setSelectedAddress(address)}
                            >
                                <div>
                                    <input
                                        type="radio"
                                        name="address-radio"
                                        checked={isAddressSelected(address)}
                                        readOnly
                                        id={address.id}
                                    />
                                </div>

                                <label htmlFor={address.id}>
                                    <p>
                                        {address.address_line_1 +
                                            ", " +
                                            address.address_line_2}
                                    </p>

                                    <p>
                                        {address.city +
                                            " - " +
                                            address.pincode +
                                            ", " +
                                            address.state}
                                    </p>
                                </label>
                            </div>
                        ))}
                    <div className="checkout_add_address">
                        <CreateNewAddressModal />
                    </div>
                </div>
                <div className="price_details">
                    <h2 className="cart__price__details__title">
                        Price Details
                    </h2>
                    <hr />
                    <div className="checkout_item">
                        <p>Price ({cartlist.length})</p>
                        <p>{totalCartValue.toFixed(2)}</p>
                    </div>
                    <div className="checkout_item">
                        <p>Discount (40%)</p>
                        <p>{-(totalCartValue * 40) / 100}</p>
                    </div>
                    <div className="checkout_item">
                        <p>Delivery Charges</p>
                        <p>40</p>
                    </div>
                    <hr />
                    <div className="checkout_item">
                        <p>Total Price</p>
                        <p>
                            {totalCartValue.toFixed(2) -
                                (totalCartValue * 40) / 100 +
                                40}
                        </p>
                    </div>

                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            width: "100%",
                            color: "#FFF",
                            backgroundColor: "black",
                            ":hover": {
                                color: "#FFF",
                                backgroundColor: "#3b82f6",
                            },
                        }}
                        onClick={handlePlaceOrder}
                    >
                        <span className="btn_content">Place Order</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
