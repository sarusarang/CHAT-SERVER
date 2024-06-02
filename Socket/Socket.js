const { Server } = require('socket.io')
const http = require('http')
const express = require('express')


const app = express()

const server = http.createServer(app)

const io = new Server(server, {

    cors: {

        origin: ['https://chatiko-chat-app.vercel.app'],
        methods: ['GET', 'POST']

    },

})


const usersocketMap = {}

io.on('connection', (socket) => {

    // console.log('user connected', socket.id);

    const userId = socket.handshake.query.userId

    if (userId) {

        usersocketMap[userId] = socket.id
       

    }
   

    io.emit('getOnlineUsers',Object.keys(usersocketMap))

    socket.on('disconnect',()=>{

        // console.log("user disconnected",socket.id);
        delete usersocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(usersocketMap))

    })


})

module.exports = { app, io, server }
