import React, { useState } from "react";
import Head from "./head";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";

function Home() {
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    return (
        <div className="home-page">
            <Head />
            <div className="main">
                <div className="joininfo">
                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        value={name}
                        onInput={(evt) => setName(evt.target.value)}
                    />
                    <br />
                    <TextField
                        id="filled-basic"
                        label="Join Code"
                        variant="filled"
                        value={link}
                        onInput={(evt) => setLink(evt.target.value)}
                    />
                    <br />
                    <Link to={`/${link}`}>
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
