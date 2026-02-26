import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <img className="logo" src={logo} alt="Logo" />
            </div>

            <div className={`nav-center ${menuOpen ? "open" : ""}`}>
                <a href="/">Home</a>
                <a href="/trips">Trips</a>
            </div>

            <div className={`nav-right ${menuOpen ? "open" : ""}`}>
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

            {/* Hamburger menu for mobile */}
            <div
                className={`hamburger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;
