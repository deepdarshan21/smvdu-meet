import React from "react";
import Head from "./head";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <Head />
            <div className="main">
                <div className="joininfo">
                    <TextField id="filled-basic" label="Name" variant="filled" />
                    <br />
                    <TextField id="filled-basic" label="Join Code" variant="filled" />
                    <br />
                    <Link to="/meet">
                        <IconButton variant="contained" size="large" color="success">
                            <ControlPointIcon fontSize="inherit" />
                        </IconButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
