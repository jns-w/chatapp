const express = require('express')
const server = express()
require('dotenv').config()
require('./lib/connection')
const cors = require('cors')
const passport = require('./lib/auth')

server.use(express.json())
server.use(cors())


server.use('/chat', require('./routes/chats.routes'))

server.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`)
})