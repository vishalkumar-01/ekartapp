import React, { useContext } from "react";
import Header from "../../Components/Header/Header";
import { DataContext } from "../../context/DataProvider";
import Product from "../../Components/Product/Product";
import Lottie from "lottie-react";

import "./OrderSummary.css";
import orderSummary from "../../lottie-files/orderSummary.json";
import { NavLink } from "react-router-dom";

const OrderSummary = () => {
    const { cartlist, orderObj } = useContext(DataContext);
    const { addressToDeliver, boughtItems, totalOrderValue } = orderObj;
    return (
        <div>
            <Header />
            <div>
                {" "}
                <div className="order-animation">
                    <Lottie loop={false} animationData={orderSummary} />
                </div>
                <h2>Order Summary</h2>
                <p>Thank you for placing your order</p>
                <div className="orderSummary_container">
                    <div className="productlist-main-cards-container">
                        {boughtItems.map((product) => (
                            <Product product={product} key={product.id}/>
                        ))}
                    </div>
                    <div className="orderSummary_text">
                        <div>
                            <b>Delivery Address: </b>
                            <span>
                                {addressToDeliver.address_line_1 +
                                    " " +
                                    addressToDeliver.address_line_2 +
                                    ", " +
                                    addressToDeliver.city +
                                    " - " +
                                    addressToDeliver.pincode +
                                    ", " +
                                    addressToDeliver.state +
                                    "."}
                            </span>
                        </div>
                        <div>
                            <b>Total Amount Paid: </b>
                            <span>{totalOrderValue}</span>
                        </div>
                    </div>
                </div>
                <NavLink to="/products">Shop More!</NavLink>
            </div>
        </div>
    );
};

export default OrderSummary;
