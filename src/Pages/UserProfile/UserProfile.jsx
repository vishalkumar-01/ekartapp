import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../Components/Header/Header";

import "./UserProfile.css";
import { DataContext } from "../../context/DataProvider";

import Button from "@mui/material/Button";
import CreateNewAddressModal from "./CreateNewAddress/CreateNewAddressModal";
import EditAddressModal from "./AddressEditModal/EditAddressModal";
import { useNavigate } from "react-router-dom";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";
import { ReactToastify } from "../../Utility/ReactTostify";

const UserProfile = () => {
    const { user, setToken, setUser } = useContext(AuthContext);
    const { addresses, order_summary, handleRemoveAddress } =
        useContext(DataContext);
    const [currentProfileOption, setCurrentProfileOption] = useState("profile");

    const handleOption = (value) => {
        setCurrentProfileOption(value);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // console.log("logout");
        navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        ReactToastify("Logged Out Successfully", "success");
    };

    // useEffect(() => {
    //     console.log(order_summary);
    // }, [order_summary]);

    const style = {
        backgroundColor: "black",
        color: "#FFF",
        borderRadius: "0.25rem",
    };

    return (
        <div>
            <Header />
            <div className="user_profile_container">
                <section className="user_profile_container_options">
                    <button
                        className="option_btn"
                        value="profile"
                        onClick={(e) => handleOption(e.target.value)}
                        style={currentProfileOption === "profile" ? style : {}}
                    >
                        Profile Details
                    </button>
                    <button
                        className="option_btn"
                        value="address"
                        onClick={(e) => handleOption(e.target.value)}
                        style={currentProfileOption === "address" ? style : {}}
                    >
                        Address Details
                    </button>
                    <button
                        className="option_btn"
                        value="order_history"
                        onClick={(e) => handleOption(e.target.value)}
                        style={
                            currentProfileOption === "order_history"
                                ? style
                                : {}
                        }
                    >
                        Order History
                    </button>
                </section>

                {currentProfileOption === "profile" ? (
                    <div className="user_profile_data">
                        <p>
                            <span>Name: </span>
                            {user.firstName + " " + user.lastName}
                        </p>
                        <p>
                            <span>Email: {user.email}</span>
                        </p>
                        <br />
                        <button className="logout_btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : currentProfileOption === "address" ? (
                    <div className="addresses_data">
                        <span>Address added</span>
                        <hr />
                        {addresses &&
                            addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="profile_address_card"
                                >
                                    <div>
                                        <p>{address.address_line_1}</p>
                                        <p>{address.address_line_2}</p>
                                        <p>
                                            {address.city} - {address.pincode}
                                        </p>
                                        <p>{address.state}</p>
                                    </div>

                                    <div className="address_card_btns">
                                        <EditAddressModal address={address} />
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                handleRemoveAddress(address)
                                            }
                                        >
                                            Remove Address
                                        </Button>
                                    </div>

                                    <hr />
                                </div>
                            ))}

                        <CreateNewAddressModal />
                    </div>
                ) : (
                    <div className="order_history_container">
                        <h3>Order History</h3>
                        <hr />
                        <div>
                            {order_summary.map((order, index) => (
                                <div
                                    className="order_history_order"
                                    key={index}
                                >
                                    <div>
                                        {order.boughtItems.map((product) => (
                                            <Product
                                                product={product}
                                                key={product.id}
                                            />
                                        ))}
                                    </div>
                                    <div className="order_history_address">
                                        <h3>Order Address Details:</h3>
                                        <p>
                                            {order.addressToDeliver
                                                .address_line_1 + ","}
                                        </p>
                                        <p>
                                            {order.addressToDeliver
                                                .address_line_2 + ","}
                                        </p>
                                        <p>
                                            {order.addressToDeliver.city} -{" "}
                                            {order.addressToDeliver.pincode +
                                                "."}
                                        </p>
                                        <p>
                                            {order.addressToDeliver.state + "."}
                                        </p>
                                        <h3>Total Order Price:</h3>
                                        <p>₹ {order.totalOrderValue}/-</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
