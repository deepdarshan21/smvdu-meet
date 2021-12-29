import React from "react";
import "./NavBar.css";
import Time from "./time";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";

const NavBar = () => {
    return (
        // <div className="navbar">
        //     {/* <div className="heading">
        //         <div className="title">SMVDU MEET</div>
        //         {/* <div className="tagline">Online Class Room Made Simple</div> */}
        //     </div> */}
        //     <Time />
        // </div>
        <AppBar position="static">
            <Toolbar
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <VideocamRoundedIcon style={{ fontSize: "36px" }} />
                <Typography variant="h4">SMVDU MEET</Typography>
                <Box display="flex">
                    <Time />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
