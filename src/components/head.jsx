import React from "react";
import Time from "./time";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";

function Head() {
    return (
        <div className="top">
            <Link to="/">
                <div className="left">
                    <VideoCameraFrontIcon fontSize="large" />
                    <span className="icon">SMVDU Meet</span>
                </div>
            </Link>
            <div className="right">
                <Time />
                <span className="help icon" size="large">
                    <HelpOutlineIcon fontSize="large" />
                </span>
                <span className="settings icon" size="large">
                    <SettingsIcon fontSize="large" />
                </span>
                <span className="profile icon" size="large">
                    <AccountCircleIcon fontSize="large" />
                </span>
            </div>
            {/* Deep */}
        </div>
    );
}

export default Head;
