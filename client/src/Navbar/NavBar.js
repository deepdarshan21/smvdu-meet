import React from "react";
import "./NavBar.css";
import Time from "./time";
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="heading">
                <div className="title">SMVDU Meet</div>
                <div className="tagline">Online Class Room Made Simple</div>
            </div>
            <Time />
        </div>
    );
};

export default NavBar;
