import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../../assets/svg/brand.svg";
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation()
    return (
        location.pathname==="/" ?
        <>
            <header>
                <div className="custom-container">
                    <div className="custom-row">
                        <nav className="nav-bar top-navbar">
                            <div className="navbar-brand">
                                <Link to="/" className="navbar-logo">
                                    <img src={brand} alt="brand" />
                                </Link>
                            </div>
                            <div className="navbar-collapse">
                                <Link to="/pool" className="custom-btn btn-stake">
                                    Stake now
                                </Link>
                                <div className="btn-hamburger">
                                    <div className="hamburger-piece"></div>
                                    <div className="hamburger-piece"></div>
                                    <div className="hamburger-piece"></div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>:<></>
    );
}

export default Header;