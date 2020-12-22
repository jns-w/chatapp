const express = require('express')
const app = express()
const server = require('http').createServer(app)
require('dotenv').config()
require('./lib/connection')
const cors = require('cors')
const passport = require('./lib/auth')

const io = require('socket.io')
// app.use(server.json())
app.use(cors())

app.use('/api/chat', require('./routes/chats.routes'))

// io.on('connection', socket => { /* ... */ })

server.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`)
})