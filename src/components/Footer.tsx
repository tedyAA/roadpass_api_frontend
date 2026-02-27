import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // replace with your logo path
import "./Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer sour-gummy-100">
            <div className="footer-left">
                <img src={logo} alt="Logo" className="footer-logo" />
                <h2 className="footer-title">Trip Explorer</h2>
                <p className="footer-slogan">Discover your next adventure</p>
            </div>

            <div className="footer-center">
                <h2>Links</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/trips">Trips</Link></li>
                </ul>
            </div>

            <div className="footer-right">
                <h2>Contact</h2>
                <p>123 Main Street, City, Country</p>
                <p>Phone: +123 456 789</p>
                <p>Email: info@tripexplorer.com</p>
            </div>
        </footer>
    );
};

export default Footer;
