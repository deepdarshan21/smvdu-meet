import React, { useState } from "react";
import MicButtonImg from "../../resources/images/mic.svg";
import MicButtonOffImg from "../../resources/images/micOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

const MicButton = () => {
    const [isMicMuted, setIsMicMuted] = useState(false);

    const handleMicButtonPressed = () => {
        webRTCHandler.toggleMic(isMicMuted);

        setIsMicMuted(!isMicMuted);
    };

    return (
        <div className="video_button_container">
            <img
                src={isMicMuted ? MicButtonOffImg : MicButtonImg}
                onClick={handleMicButtonPressed}
                className={
                    isMicMuted ? "off video_button_image" : "video_button_image"
                }
                alt="mic"
            />
        </div>
    );
};

export default MicButton;
