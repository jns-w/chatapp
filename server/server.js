const express = require('express')
const app = express()
const server = require('http').createServer(app)
require('dotenv').config()
require('./lib/connection')
const socket = require('./lib/socket')
const cors = require('cors')

// const socketIo = require('socket.io');
const io = require('socket.io')(server)

app.use(express.json())
app.use(cors())

app.use('/api/chat', require('./routes/chats.routes'))
app.use('/api/user', require('./routes/user.routes'))

socket(io)

server.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`)
})