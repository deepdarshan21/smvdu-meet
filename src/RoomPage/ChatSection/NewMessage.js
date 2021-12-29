import React , {useState } from 'react';
import sendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { questionCheck } from './questionCheck';
import { abuseCheck} from "./AbuseChecker";

const NewMessage = () => {
    const [message , setMessage] = useState("");

    const handleTextChange = ((event) => {
        setMessage(event.target.value);
    });

    const handleKeyPressed = ((event) => {
        if(event.key === "Enter"){
            event.preventDefault();

            //send message to other users
            sendMessage();
        }
    });

    const sendMessage = () => {

        if(message.length > 0)
        {
            
            //execute a function to send message
            webRTCHandler.sendMessageUsingDataChannel(abuseCheck(questionCheck(message)));
            setMessage("");
        }
    };

    return (
        <div className='new_message_container'>
            <input
                className='new_message_input'
                value={message}
                onChange = {handleTextChange}
                placeholder='Type your message ...'
                type= "text"
                onKeyDown={handleKeyPressed}
            />
             <img 
                className='new_message_button'
                src={sendMessageButton}
                onClick = {sendMessage}
                alt="message"
            />
        </div>
    )
}

export default NewMessage;
