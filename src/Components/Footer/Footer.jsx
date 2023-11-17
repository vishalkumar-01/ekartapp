import React from "react";
import { NavLink } from "react-router-dom";

import "./Footer.css";

import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <footer className="main-footer-container">
            <div className="footer-links">
                <NavLink to="/" target="_blank">
                    <TwitterIcon />
                </NavLink>

                <NavLink to="/" target="_blank">
                    <GitHubIcon />
                </NavLink>

                <NavLink
                    to="/"
                    target="_blank"
                >
                    <LinkedInIcon />
                </NavLink>
            </div>
            <div className="footer-text">
                © 2023, No Copyright, Feel free to replicate.
            </div>
        </footer>
    );
};

export default Footer;
