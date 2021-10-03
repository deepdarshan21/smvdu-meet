import React, { useState } from "react";
import Head from "./head";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Link } from "react-router-dom";

function Main() {
    const styles = {
        true: {
            display: "inline",
        },
        false: {
            display: "none",
        },
    };
    const [cameraOn, updateCameraOn] = useState(false);
    const [micOn, updateMicOn] = useState(false);
    return (
        <div className="meet">
            <Head />
            <div className="meet-screen"></div>
            <div className="buttons bottom-bar">
                <span
                    className="camera meet-feature"
                    onClick={() => {
                        updateCameraOn(!cameraOn);
                    }}
                >
                    <VideocamIcon className="on" style={styles[cameraOn]} />
                    <VideocamOffIcon className="off" style={styles[!cameraOn]} />
                </span>
                <span
                    className="mic meet-feature"
                    onClick={() => {
                        updateMicOn(!micOn);
                    }}
                >
                    <MicIcon className="on" style={styles[micOn]} />
                    <MicOffIcon className="off" style={styles[!micOn]} />
                </span>
                <Link to="/meet/end">
                    <span className="end-call">
                        <CallEndIcon />
                    </span>
                </Link>
            </div>
        </div>
    );
}
export default Main;
