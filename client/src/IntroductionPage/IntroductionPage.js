import React, { useEffect } from "react";
import logo from "../resources/images/logo.png";
import "./IntroductionPage.css";
import NavBar from "../Navbar/NavBar";
import ConnectingButtons from "./ConnectingButtons";
import { setConnectOnlyWithAudio, setIsRoomHost } from "../store/actions";
import { connect } from "react-redux";

const IntroductionPage = ({ setIsRoomHostAction, setConnectOnlyWithAudio }) => {
    useEffect(() => {
        setIsRoomHostAction(false);
        setConnectOnlyWithAudio(false);
    }, []);

    return (
        <div className="introduction_page_container">
            <NavBar />
            <div className="introduction_page_panel">
                {/* <div>
                        <div className="title">SMVDU Meet</div>
                        <div className="tagline">Online Class Room Made Simple</div>
                    </div> */}
                <ConnectingButtons />
            </div>
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
