import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <img className="logo" src={logo}></img>
            </div>

            <div className="nav-center sour-gummy-100">
                <a href="/">Home</a>
                <a href="/trips">Trips</a>
            </div>

            <div className="nav-right sour-gummy-100">
                <a
                    href="https://github.com/tedyAA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/teodora-angelova-4a637b181/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                >
                    LinkedIn
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
