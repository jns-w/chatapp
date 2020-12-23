function socket(io) {
  io.on('connection', (client) => {

  // join chat
  const { chatid, user } = client.handshake.query
  console.log(`${user} has joined the chat`)
  client.join(chatid)

  // listen
  client.on("newChatMessage", (data) => {
    console.log("message received")
    io.in(chatid).emit("newChatMessage", data)
  })

  client.on('disconnect', () => {
    client.leave(chatid)
  })

})
}

module.exports = socket