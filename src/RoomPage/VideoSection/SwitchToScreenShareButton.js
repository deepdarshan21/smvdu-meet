import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharePreview from "./LocalScreenSharePreview";
import * as webRTCHander from "../../utils/webRTCHandler";

const constraints = {
    audio: false,
    video: true,
};

const SwitchToScreenShareButton = () => {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
            } catch (err) {
                console.log(
                    "Error occured while trying to get access to screen sharing stream"
                );
            }
            if (stream) {
                setScreenSharingStream(stream);
                webRTCHander.toggleScreenShare(isScreenSharingActive, stream);

                setIsScreenSharingActive(true);
                //execute function to switch video track which we are sending to the users
            }
        } else {
            //switch for video track from camera
            webRTCHander.toggleScreenShare(isScreenSharingActive);

            setIsScreenSharingActive(false);

            //stop screen share stream
            screenSharingStream.getTracks().forEach((t) => t.stop());
            setScreenSharingStream(null);
        }

        // setIsScreenSharingActive(!isScreenSharingActive);
    };

    return (
        <>
            <div className="video_button_container">
                <img
                    src={SwitchImg}
                    onClick={handleScreenShareToggle}
                    className="video_button_image"
                    alt="screen share toggle"
                />
            </div>
            {isScreenSharingActive && (
                <LocalScreenSharePreview stream={screenSharingStream} />
            )}
        </>
    );
};

export default SwitchToScreenShareButton;
