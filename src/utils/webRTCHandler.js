import { setMessages, setShowOverlay } from "../store/actions";
import * as wss from "./wss";
import store from "../store/store";
import Peer from "simple-peer";
import { fetchTURNCredentials, getTURNIceServers } from "./turn";

const defaultConstraints = {
    audio :true,
    video:{
        width : "480",
        height : "360"
    }
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost,
    identity,
    roomId = null
 ) => {
        await fetchTURNCredentials();

        navigator.mediaDevices.getUserMedia(defaultConstraints).then(stream => {

            console.log("KK");
            localStream = stream;
            showLocalVideoPreview(localStream);

            store.dispatch(setShowOverlay(false));

            isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity , roomId);

        }).catch(err => {
            console.log("Error occured while trying to  access local stream");
            console.log(err);
        });
 }

 let peers = {};
 let streams = [];

 const getConfiguration = () => {

    const turnIceServers = getTURNIceServers();

    if(turnIceServers){
        console.log("TURN server credentials fetched");
        console.log(turnIceServers);
        return {
            iceServers : [
                {
                     urls : "stun:stun.l.google.com:19302"
                },
                ...turnIceServers
            ]
        };
    }
    else {
        console.warn("Using only STUN server");
        return {
         iceServers : [
             {
                 urls : "stun:stun.l.google.com:19302"
             }
         ]
        };
    }

     
 };

 const messengerChannel = "messenger";

 export const prepareNewPeerConnection = (connUserSocketId , isInitiator) => {
    const configuration = getConfiguration();

    peers[connUserSocketId] = new Peer({
        initiator : isInitiator,
        config : configuration,
        stream : localStream,
        channelName : messengerChannel
    });

    peers[connUserSocketId].on("signal" , (data) => {

        //webRTC offer , webRTC Answer (SDP Informations) , ice candidates

        const signalData = {
            signal : data ,
            connUserSocketId : connUserSocketId
        };
        wss.signalPeerData(signalData);
    });

    peers[connUserSocketId].on("stream", (stream) => {
        console.log("new stream came");

        addStream(stream , connUserSocketId);
        streams = [...streams , stream];
    });

    peers[connUserSocketId].on("data" , (data) => {
        const messageData = JSON.parse(data);
        appendNewMessage(messageData);
    });
 };

 export const handleSignalingData = (data) => {
    //add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
 };

export const removePeerConnection = (data) => {
    const {socketId} = data;
    const videoContainer = document.getElementById(socketId);
    const videoEl = document.getElementById(`${socketId}-video`);

    if(videoContainer && videoEl){
        const tracks = videoEl.srcObject.getTracks();

        tracks.forEach(t => t.stop());

        videoEl.srcObject = null;
        videoContainer.removeChild(videoEl);

        videoContainer.parentNode.removeChild(videoContainer);

        if(peers[socketId])
        {
            peers[socketId].destroy();
        }
        delete peers[socketId];
    }
};

 /////////////////////////////////UI Videos///////////////////////////////// 
    const showLocalVideoPreview = (stream) => {
        const videosContainer = document.getElementById("videos_portal");
        videosContainer.classList.add("videos_portal_styles");
        const videoContainer = document.createElement("div");
        videoContainer.classList.add("video_track_container");
        const videoElement = document.createElement("video");
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.srcObject = stream;

        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };

        videoContainer.appendChild(videoElement);
        videosContainer.appendChild(videoContainer);

 };

 const addStream = (stream , connUserSocketId) => {
     //display incoming stream
     const videosContainer = document.getElementById("videos_portal");
     const videoContainer = document.createElement("div");
     videoContainer.id = connUserSocketId;
     videoContainer.classList.add("video_track_container");

     const videoElement = document.createElement("video");
     videoElement.autoplay = true;
     videoElement.srcObject = stream;
     videoElement.id = `${connUserSocketId}-video`;

     videoElement.onloadedmetadata = () => {
         videoElement.play();
     };

     videoElement.addEventListener("click" , () => {
         if(videoElement.classList.contains("full_screen"))
         {
            videoContainer.style.position = "relative" ;
            videoElement.classList.remove("full_screen");
         }
         else {
            videoContainer.style.position = "static" 
            videoElement.classList.add("full_screen");
         }
     });

     videoContainer.appendChild(videoElement);

     videoContainer.style.position = "static";

     videosContainer.appendChild(videoContainer);
 };

 /////////////////////////////////Buttons logic/////////////////////////////////
 export const toggleMic = (isMuted) => {
    localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
 };

 export const toggleCamera = (isDisabled) => {
    localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
 };

 export const toggleScreenShare = (isScreenSharingActive , screenSharingStream = null) => {
    if(isScreenSharingActive){
            switchVideoTracks(localStream);
    }
    else {
            switchVideoTracks(screenSharingStream);
    }
 };

 const switchVideoTracks = (stream) => {
    for(let socket_id in peers){
        for(let index in peers[socket_id].streams[0].getTracks()){
            for(let index2 in stream.getTracks()){
                if(peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind){
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
 };

 /////////////////////////////////Messages/////////////////////////////////

 const appendNewMessage = (messageData) => {
     const messages = store.getState().messages;
     store.dispatch(setMessages([...messages,messageData]));
 };

 export const sendMessageUsingDataChannel = (messageContent) => {
     //apend message locally
     const identity = store.getState().identity;

     const localMessageData = {
         content : messageContent,
         identity,
         messageCreatedByMe : true
     };

     appendNewMessage(localMessageData);

     const messageData = {
         content : messageContent,
         identity
     };

     const stringifiedMessageData = JSON.stringify(messageData);
     for(let socketId in peers){
         peers[socketId].send(stringifiedMessageData);
     }
 }