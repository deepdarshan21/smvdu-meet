import React , {useState} from 'react'
import JoinRoomInputs from './JoinRoomInputs';
import {connect} from "react-redux";
// import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from '../store/actions';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import { getRoomExists } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const JoinRoomContent = (props) => {

    const {isRoomHost , setIdentityAction , setRoomIdAction} = props;
    const [roomIdValue , setRoomIdValue] = useState("");
    const [nameValue , setNameValue] = useState("");
    const [errorMessage , setErrorMessage] = useState(null);

    let navigate = useNavigate();

    const handleJoinRoom = async () => {

        if(isRoomHost)
        {
            setIdentityAction(nameValue + " (Host)");
        }
        else {
            setIdentityAction(nameValue);
        }

        if(isRoomHost){
            createRoom();
        }
        else {
            await joinRoom();
        }
    };

    const joinRoom = async () =>  {
        const responseMessage = await getRoomExists(roomIdValue);

        const {roomExists , full } = responseMessage;

        if(roomExists){
                if(full){
                    setErrorMessage("Meeting is full . Please try again later");
                }
                else {
                    //join a room
                    setRoomIdAction(roomIdValue);

                    navigate("/room");
                }
        }
        else {
            setErrorMessage("Meeting not found . Check your meeting Id");
        }
    };

    const createRoom = () => {
            navigate("/room");
    };


    return (
        <>
            <JoinRoomInputs 
            roomIdValue = {roomIdValue}
            setRoomIdValue = {setRoomIdValue}
            nameValue = {nameValue}
            setNameValue = {setNameValue}
            isRoomHost = {isRoomHost}
            />
            {/* <OnlyWithAudioCheckbox
                setConnectOnlyWithAudio = {setConnectOnlyWithAudio}
                connectOnlyWithAudio = {connectOnlyWithAudio}
            /> */}
            <ErrorMessage errorMessage = {errorMessage} />
            <JoinRoomButtons 
                handleJoinRoom ={handleJoinRoom}
                isRoomHost = {isRoomHost}
            />
        </>
    )
};

const mapStoreStateToProps = (state) => {
    return {
        ...state
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio : (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)) ,
        setIdentityAction : (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction : (roomId) => dispatch(setRoomId(roomId))
    }
};

export default connect(mapStoreStateToProps , mapActionsToProps)(JoinRoomContent);
