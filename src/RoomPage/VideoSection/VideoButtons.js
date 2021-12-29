import React from "react";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import Attendence from "./Attendence";
import SwitchToScreenShareButton from "./SwitchToScreenShareButton";
import store from "../../store/store";
// import { withTheme } from "@emotion/react";
// import { pink } from"@mui/material/colors";


const VideoButtons = (props) => {
    const isRoomHost = store.getState().isRoomHost;
    return (
        <div className="video_buttons_container">
            <MicButton />
            <CameraButton />
            <LeaveRoomButton />
            <SwitchToScreenShareButton />
            {isRoomHost && <Attendence />}
        </div>
    );
};

export default VideoButtons;
