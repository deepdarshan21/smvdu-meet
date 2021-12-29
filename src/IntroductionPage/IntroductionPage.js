import React, { useEffect } from "react";
import imageChild from "../resources/images/online-study.jpg";
import "./IntroductionPage.css";
import NavBar from "../Navbar/NavBar";
import ConnectingButtons from "./ConnectingButtons";
import { setConnectOnlyWithAudio, setIsRoomHost } from "../store/actions";
import { connect } from "react-redux";
import { Grid, Typography } from "@mui/material";

const IntroductionPage = ({ setIsRoomHostAction, setConnectOnlyWithAudio }) => {
    useEffect(() => {
        setIsRoomHostAction(false);
        setConnectOnlyWithAudio(false);
    }, []);

    return (
        <div className="introduction_page_container">
            <NavBar />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={6}>
                    {/* <div className="introduction_page_panel">
                        <ConnectingButtons />
                    </div> */}
                    <div className="left-grid">
                        <Typography
                            variant="h1"
                            style={{ fontFamily: "'Pushster', cursive" }}
                        >
                            Online Classes Made Simple
                        </Typography>
                        <ConnectingButtons />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={imageChild} className="image" alt="child study" />
                </Grid>
            </Grid>
            <div className="footer">Made with ❤️ by team @kdk</div>
            {/* <div className="introduction_page_panel">
                <ConnectingButtons />
            </div> */}
        </div>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
        setConnectOnlyWithAudio: (onlyWithAudio) =>
            dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    };
};
export default connect(null, mapActionsToProps)(IntroductionPage);
