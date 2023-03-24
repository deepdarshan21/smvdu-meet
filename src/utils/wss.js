import io from "socket.io-client";
import { setParticipants, setRoomId } from "../store/actions";
import * as webRTCHandler from "./webRTCHandler";
import store from "../store/store";

// const SERVER = "http://localhost:5002";
const SERVER = "https://online-classroom-meet-client-production.up.railway.app";

let socket = null;

export const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on("connect", () => {
        console.log("Connected to socket io server");
        console.log(socket.id);
    });

    socket.on("room-id", (data) => {
        const { roomId } = data;
        store.dispatch(setRoomId(roomId));
    });

    socket.on("room-update", (data) => {
        const { connectedUsers } = data;
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on("conn-prepare", (data) => {
        const { connUserSocketId } = data;

        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

        //inform the user that just joined the room about the incoming connection
        socket.emit("conn-init", { connUserSocketId: connUserSocketId });
    });

    socket.on("conn-signal", (data) => {
        webRTCHandler.handleSignalingData(data);
    });

    socket.on("conn-init", (data) => {
        const { connUserSocketId } = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on("user-disconnected", (data) => {
        webRTCHandler.removePeerConnection(data);
    });
};

export const createNewRoom = (identity) => {
    //emit an event to server to create new room

    const data = {
        identity,
    };
    socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId) => {
    //emit an event to server to join room

    const data = {
        roomId,
        identity,
    };
    socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
    socket.emit("conn-signal", data);
};
