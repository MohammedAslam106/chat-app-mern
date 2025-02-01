import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app=express()

const server= http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173','https://chat-app-mern-production-ukgl.onrender.com'],
        methods:["GET","POST"]
    }
})

export const getReceiverSocketId=(receiverId:string)=>{
    return userSocketMap[receiverId]
}

const userSocketMap:{[key:string]:string}={} //{userId:socketId}

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id)

    const userId=socket.handshake.query.userId
    if(typeof userId === 'string'){
        userSocketMap[userId]=socket.id
    }

    // io.emit() is used to send events to all connected clients;
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    // socket.on() is used to listen to the events. Can be used both on client and server side.
    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id)

        delete userSocketMap[userId as string];

        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})

export {app,io,server}