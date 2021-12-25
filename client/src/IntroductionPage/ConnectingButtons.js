import React from "react";
import ConnectingButton from "./ConnectingButton";
import { useNavigate } from "react-router-dom";

const ConnectingButtons = () => {
    let navigate = useNavigate();

    const pushToJoinRoomPage = () => {
        navigate("/join-room");
    };

    const pushToJoinRoomPageAsHost = () => {
        navigate("/join-room?host=true");
    };

    return (
        <div className="connecting_buttons_container">
            <ConnectingButton
                className="create_room_button"
                createRoomButton
                buttonText="Host a Meeting"
                onClickHandler={pushToJoinRoomPageAsHost}
            />
            <ConnectingButton
                className="join_room_button"
                buttonText="Join a Meeting"
                onClickHandler={pushToJoinRoomPage}
            />
        </div>
    );
};

export default ConnectingButtons;
