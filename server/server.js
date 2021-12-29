const express = require("express");
const http = require("http");
require("dotenv").config();
const { v4:uuidv4 } = require("uuid");
const cors = require("cors");
const twilio  = require("twilio");
const { log } = require("console");

const PORT = process.env.PORT || 5002 ;

const app = express();

const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];

//create route to check if room exists

app.get("/api/room-exists/:roomId" , (req,res) => {
    const {roomId} = req.params;

    const room = rooms.find((room) => room.id === roomId);

    if(room){
        //room exist
        if(room.connectedUsers > 3){
            res.send({ roomExists : true , full : true });
        }
        else {
            res.send({ roomExists : true , full : false });
        }
    }
    else {
        //room doesnot exist
        res.send({roomExists : false});
    }
});

app.get("/api/get-turn-credentials" , (req,res) => {
    const accountSid = "AC5272b4d72c9bbd433c2a705dd5f4d872";
    const authToken = process.env.TURN_SERVER_AUTH_TOKEN;

    const client = twilio(accountSid , authToken);

    let responseToken = null;

    try {
        client.tokens.create().then(token => {
            responseToken = token;
            res.send({token});
        })
    } catch (err) {
        console.log("Error occured when fetching turn server credentials");
        console.log(err);
        res.send({token : null});
    }
});

const io = require("socket.io")(server , {
    cors : {
        origin : "*" ,
        methods : [ "GET" , "POST" ] 
    }
});

io.on("connection",(socket) => {
    console.log(`User connected with ${socket.id}`);

    socket.on("create-new-room" , (data) => {
        createNewRoomHandler(data,socket);
    });

    socket.on("join-room", (data) => {
        joinRoomHandler(data,socket);
    });

    socket.on("disconnect", () => {
        disconnectHandler(socket);
    });

    socket.on("conn-signal" , (data) => {
        signalingHandler(data , socket);
    });

    socket.on("conn-init" , (data) => {
        initializeConnectionHandler(data , socket);
    });

});

//socket.io handlers

const createNewRoomHandler = (data , socket) => {
    console.log("Host creating new Room");
    console.log(data);
    const {identity} = data;

    const roomId = uuidv4();

    //create new users
    const newUser = {
        identity,
        id : uuidv4(),
        socketId : socket.id,
        roomId
    };

    //push users to connected users
    connectedUsers = [...connectedUsers,newUser];

    //create new Room
    const newRoom = {
        id : roomId,
        connectedUsers : [newUser]
    }

    //join socket.io room
    socket.join(roomId);

    rooms = [...rooms , newRoom];

    //emit roomId to the client that created the room
    socket.emit("room-id" , {roomId});

    //emit an event to all users in that room about new users joining
    socket.emit("room-update",{connectedUsers : newRoom.connectedUsers});
};

const joinRoomHandler = (data,socket) => {
    const {identity,roomId} = data;

    const newUser = {
        identity,
        id : uuidv4(),
        socketId : socket.id,
        roomId
    }

    //join room passing room Id
    const room = rooms.find((room) => room.id === roomId);
    room.connectedUsers = [...room.connectedUsers , newUser];

    //join socket.io room
    socket.join(roomId);

    //add new user to connected Users
    connectedUsers = [...connectedUsers,newUser];

    //emit to all users already in the room to prepare peer connection
    room.connectedUsers.forEach((user) => {
            if(user.socketId !== socket.id )
            {
                const data = {
                    connUserSocketId : socket.id
                };

                io.to(user.socketId).emit("conn-prepare",data);
            }
    });

    io.to(roomId).emit("room-update" , {connectedUsers : room.connectedUsers});

};

const disconnectHandler = (socket) => {
    //find if user was regisered
    const user = connectedUsers.find((user) => user.socketId === socket.id );

    if(user){
        //remove user from room in server
        const room = rooms.find(room => room.id === user.roomId);

        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);

        //leave socket.io room
        socket.leave(user.roomId);

        //emit event to rest of the users in room about connected Users
        io.to(room.id).emit("room-update",{connectedUsers : room.connectedUsers});

        //close the room if number of users left is 0
        if(room.connectedUsers.length > 0 ){

            //emit to the rest of users in the room that user disconnected
            io.to(room.id).emit("user-disconnected" , {socketId : socket.id});

            //emit event to rest of the users in room about connected Users
            io.to(room.id).emit("room-update",{connectedUsers : room.connectedUsers});
        }
        else {
            rooms = rooms.filter(r => r.id !== room.id );
        }
    }
};

const signalingHandler = (data , socket) => {
    const {connUserSocketId,signal} = data;

    const signalingData = {signal , connUserSocketId:socket.id };
    io.to(connUserSocketId).emit("conn-signal" , signalingData);
};

//information from clients which are already in room that they have prepared for incoming connection
const initializeConnectionHandler = (data , socket) => {
    const {connUserSocketId} = data;
    const initData = {connUserSocketId : socket.id}
    io.to(connUserSocketId).emit("conn-init" , initData);
};

server.listen(PORT , () => {
    console.log(`Server is listening on ${PORT}`);
});