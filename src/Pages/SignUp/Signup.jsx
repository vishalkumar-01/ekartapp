import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { AuthContext } from "../../context/AuthContext";

import { NavLink, useNavigate } from "react-router-dom";

import "./Signup.css";
import { ReactToastify } from "../../Utility/ReactTostify";

const Signup = () => {
    const navigate = useNavigate();

    const { user, setToken, setUser } = useContext(AuthContext);

    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        console.log(signUpInfo);
    }, [signUpInfo]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (signUpInfo.confirmPassword !== signUpInfo.password) {
            ReactToastify("Password is not matching!", "error");
        } else {
            try {
                setTimeout(async () => {
                    const {
                        data: { encodedToken, user },
                    } = await axios.post("/api/auth/signup", signUpInfo);

                    localStorage.setItem("token", encodedToken);
                    localStorage.setItem("user", JSON.stringify(user));

                    setToken(encodedToken);
                    setUser(user);
                    ReactToastify(
                        `Signed up Successfully, Welcome ${user?.firstName}`,
                        "success"
                    );
                }, 500);

                navigate("/products");
            } catch (error) {
                if (error.response.status === 422) {
                    console.log("User already exists");
                } else {
                    console.log(error);
                }
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="page-container">
                <div className="signup-form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSignUp} className="signup-form">
                        <div className="signUp__form__field">
                            <label>First Name:</label>
                            <div>
                                <input
                                    type="text"
                                    value={signUpInfo.firstName}
                                    placeholder="Enter your First Name..."
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            firstName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="signUp__form__field">
                            <label>Last Name:</label>
                            <div>
                                <input
                                    type="text"
                                    value={signUpInfo.lastName}
                                    placeholder="Enter your Last Name..."
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            lastName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="signUp__form__field">
                            <label>Email: </label>
                            <div>
                                <input
                                    type="email"
                                    value={signUpInfo.email}
                                    placeholder="Enter your Email..."
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="signUp__form__field">
                            <label>Password:</label>
                            <div className="password__field">
                                <input
                                    type={!showPassword ? "password" : "text"}
                                    value={signUpInfo.password}
                                    placeholder="Enter your Password..."
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                />
                                {!showPassword ? (
                                    <i
                                        className="fa fa-eye-slash password__icon"
                                        aria-hidden="true"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    ></i>
                                ) : (
                                    <i
                                        className="fa fa-eye password__icon"
                                        aria-hidden="true"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    ></i>
                                )}
                            </div>
                        </div>

                        <div className="signUp__form__field">
                            <label>Confirm Password:</label>
                            <div className="password__field">
                                <input
                                    type={
                                        !showConfirmPassword
                                            ? "password"
                                            : "text"
                                    }
                                    value={signUpInfo.confirmPassword}
                                    placeholder="Enter your Confirm Password..."
                                    onChange={(e) =>
                                        setSignUpInfo((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                />
                                {!showConfirmPassword ? (
                                    <i
                                        className="fa fa-eye-slash password__icon"
                                        aria-hidden="true"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    ></i>
                                ) : (
                                    <i
                                        className="fa fa-eye password__icon"
                                        aria-hidden="true"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    ></i>
                                )}
                            </div>
                        </div>

                        <br />
                        <button type="submit">Sign Up</button>
                        <span>
                            <b>Already have an account? </b>
                            <NavLink className="login_link" to="/login">
                                Log In
                            </NavLink>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
