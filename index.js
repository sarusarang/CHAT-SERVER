// loads .env files contents into process.env by default 
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DB/Connection')


// Creating server instance
const Chatserver = express()

// configuring cros into sever
Chatserver.use(cors())

// configuring json conversion on server 
Chatserver.use(express.json())

// configuring routes into server
Chatserver.use(router)

Chatserver.use('./Uploads',express.static('./Uploads'))


const PORT = 3000


// Calling listen method to implement listen mode for server to run 
Chatserver.listen(PORT, () => {

    console.log(`SERVER IS RUNNING AT ${PORT}`);

})


// SETTING RESPONSE FOR  BASE_URL GET REQUEST
Chatserver.get('/', (req, res) => {

    res.status(200).send("<h1>The Get Request hit successfully </h1>")


})