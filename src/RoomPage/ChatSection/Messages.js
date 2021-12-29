import React from 'react';
import {connect} from "react-redux";
import { setMessages } from '../../store/actions';
import store from "../../store/store";
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();


const Message = ({ author , content , sameAuthor , messageCreatedByMe , isRoomHost , messages}) => {

    const alignClass = messageCreatedByMe ? "message_align_right" : "message_align_left";

    const authorText = messageCreatedByMe ? "You" : author;

    const contentAdditionalStyles = messageCreatedByMe ? "message_right_styles" : "message_left_styles";

    let questionClassify = tokenizer.tokenize(content);
    let abuseClassify = tokenizer.tokenize(content);
    let dontRender = false;
    let abusing = false;
    console.log(questionClassify);
    console.log(abuseClassify);
    if(!messageCreatedByMe && questionClassify[0] === "question1" && isRoomHost)
    {
        
        alert(`${author}: ${content.replace("question1","")}`);
        
    //    const  newMessages = messages.filter((message) => message.content !== content);
    //    store.dispatch(setMessages(newMessages));
        const newMessageData = {
            content : "question2 " + content.replace("question1",""),
            identity : author
        }
        const  newMessages = messages.filter((message) => message.content !== content);
        store.dispatch(setMessages([...newMessages , newMessageData]));

    }

    if(questionClassify[0] === "question2")
    {
        dontRender  = true;
    }

    if( abuseClassify[0] === "Abused1")
    {
        if(isRoomHost)
        {
            alert(`${author} abused in chat`);
            //    const  newMessages = messages.filter((message) => message.content !== content);
            //    store.dispatch(setMessages(newMessages));
            
        }
        var  newMessageData = {
            content : "*Abused*",
            identity : author
            }
        const  newMessages = messages.filter((message) => message.content !== content);
        store.dispatch(setMessages([...newMessages , newMessageData]));
    }
    return (
        <div className={`message_container ${alignClass}`}>
            {!sameAuthor && <p className="message_title">{authorText}</p> }
            {<p className={`message_content ${contentAdditionalStyles}`}>{ abusing ? "**Abused**" : dontRender ? content.replace("question2","") : content.replace("question1","")}</p>}
        </div>
    )

};

const Messages = ({messages , isRoomHost}) => {
    return (
        <div className='messages_container'>
            {messages.map((message , index) => {

                const sameAuthor = index>0 && message.identity === messages[index-1].identity;

                return (
                    <Message
                        key = {`${message.content}${index}`}
                        author = {message.identity}
                        content = {message.content}
                        sameAuthor = {sameAuthor}
                        messageCreatedByMe = {message.messageCreatedByMe}
                        isRoomHost={isRoomHost}
                        messages = {messages}
                    />
                )
            })}
        </div>
    )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state
    }
};

export default connect(mapStoreStateToProps)(Messages);
