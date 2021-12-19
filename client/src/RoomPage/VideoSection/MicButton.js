import React , {useState} from 'react';
import MicButtonImg from "../../resources/images/mic.svg";
import MicButtonOffImg from "../../resources/images/micOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";


const MicButton = () => {

    const [isMicMuted , setIsMicMuted] = useState(false);

    const handleMicButtonPressed = () => {
        webRTCHandler.toggleMic(isMicMuted);

        setIsMicMuted(!isMicMuted);
    };

    return (
        <div className='video_button_container'>
            <img 
                src = {isMicMuted ? MicButtonOffImg : MicButtonImg }
                onClick = {handleMicButtonPressed}
                className='video_button_image'
            />
        </div>
    )
};

export default MicButton;
