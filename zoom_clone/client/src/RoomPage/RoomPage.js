import React , {useEffect} from 'react';
import ChatSection from './ChatSection/ChatSection';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import RoomLabel from './RoomLabel';
import {connect} from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from './Overlay';

import "./RoomPage.css";


const RoomPage = ({roomId , isRoomHost , identity , showOverlay}) => {

    useEffect(() => {
            webRTCHandler.getLocalPreviewAndInitRoomConnection(
                isRoomHost,
                identity,
                roomId
            );
    },[]);

    return (
        <div className='room_container' >
            <ParticipantsSection/>
            <VideoSection/>
            <ChatSection/>
            <RoomLabel roomId={roomId}/>
            { showOverlay && <Overlay/>}
        </div>
    )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state
    };
};

export default connect(mapStoreStateToProps)(RoomPage);
