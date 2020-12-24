const Chat = require('../models/chat.model')
const {validToken} = require('./jwt')
const MESSAGE_EVENT = 'message-event'
const CHAT_LIST_EVENT = 'chat-list-event'
const CHAT_USER_EVENT = 'chat-user-event'


function socket(io) {
  io.on('connection', (client) => {
    // join chat
    const {chatid, user, token} = client.handshake.query
    // SUBSCRIBE
    client.on('subscribe', async function (data) {
      if (await validToken(data.token)) {
        switch (data.type) {
          case 'chat':
            client.join(data.chatid)
            console.log(`${data.user.username} has joined the chat`)
            await addActive(data.user.id, data.chatid)
            client.to(data.chatid).emit(CHAT_USER_EVENT, {joined: data.user.username})
            break
          case 'chat-list':
            client.join('chat-list')
            console.log(`${data.user.username} has subscribed to chat-list`)
            break
        }
      }
    })
    // UNSUBSCRIBE
    client.on('unsubscribe', async function (data) {
      switch (data.type) {
        case 'chat':
          client.leave(data.chatid)
          console.log(`${data.user.username} has unsubscribed from chat`)
          await removeActive(data.user.id, data.chatid)
          client.to(data.chatid).emit(CHAT_USER_EVENT, {left: data.user.username})
          break
        case 'chat-list':
          client.leave('chat-list')
          console.log(`${data.user.username} has unsubscribed from chat-list`)
          break
      }
    })

    // listen
    client.on(MESSAGE_EVENT, (data) => {
      console.log("message event")
      client.to(chatid).emit(MESSAGE_EVENT, data)
    })

    client.on(CHAT_LIST_EVENT, (data) => {
      console.log('chat-list-event')
      client.to('chat-list').emit(CHAT_LIST_EVENT, data)
    })

    client.on(CHAT_USER_EVENT, (data) => {
      console.log('user-event')
    })

    client.on('disconnect', () => {
      client.leave(chatid)
    })

  })
}

async function addActive(userID, chatID) {
  try {
    await Chat.findOneAndUpdate({'_id': chatID}, {
      $push: {
        activeUsers: userID
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function removeActive(userID, chatID) {
  try {
    await Chat.findOneAndUpdate({'_id': chatID}, {
      $pull: {
        activeUsers: userID
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = socket