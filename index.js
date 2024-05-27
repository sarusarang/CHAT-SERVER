// loads .env files contents into process.env by default 
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const router = require('./Routes/routes')
const Messages = require('./Models/ChatModel')
require('./DB/Connection')



// Creating server instance
const Chatserver = express()

// configuring cros into sever
Chatserver.use(cors())

// configuring json conversion on server 
Chatserver.use(express.json())

// configuring routes into server
Chatserver.use(router)

Chatserver.use('/uploads',express.static('./uploads'))


const PORT = 3000


// Calling listen method to implement listen mode for server to run 
const server = Chatserver.listen(PORT, () => {

    console.log(`SERVER IS RUNNING AT ${PORT}`);

})


// SOCKET IO
const io = socketio(server)

// socket io event handling
io.on('connection',(socket)=>{

    // console.log(`socket connected : ${socket.id}`);


    // Handle chat message
    socket.on('chat_message',async (data)=>{

        console.log(`received message:${data.senderid}`);

        io.emit('chat_message',data)

    })

    // handle dissconnect
    socket.on('disconnect',()=>{

        // console.log(`socket disconnected: ${socket.id}`);

    })

})


// SETTING RESPONSE FOR  BASE_URL GET REQUEST
Chatserver.get('/', (req, res) => {

    res.status(200).send("<h1>The Get Request hit successfully </h1>")


})

module.exports =server