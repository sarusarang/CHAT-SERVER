
// loads .env files contents into process.env by default 
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
const {server,app} = require ('./Socket/Socket')
require('./DB/Connection')



// Creating server instance
// const Chatserver = express()


// configuring cros into sever
app.use(cors())

// configuring json conversion on server 
app.use(express.json())

// configuring routes into server
app.use(router)

app.use('/uploads',express.static('./uploads'))


const PORT = 3000


// Calling listen method to implement listen mode for server to run 
 server.listen(PORT, () => {

    console.log(`SERVER IS RUNNING AT ${PORT}`);

})


// SETTING RESPONSE FOR  BASE_URL GET REQUEST
app.get('/', (req, res) => {

    res.status(200).send("<h1>The Get Request hit successfully </h1>")


})

module.exports =server