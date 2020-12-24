// const Chat = require('../models/chat.model')
//
// async function updateActive(userID, chatID) {
//   try {
//     let chatData = await Chat.findById(chatID)
//     console.log('id',chatData._id)
//     chatData = await toggleActive(chatData, userID)
//     await chatData.save()
//     console.log(`current active users`, chat.activeUsers)
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }
//
// async function toggleActive(chat, userID) {
//   let index = chat.activeUsers.indexOf(userID)
//   if (index === -1) {
//     return chat.activeUsers.push(userID)
//   } else {
//     return chat.activeUsers.splice(index, 1)
//   }
// }
//
// module.exports = {updateActive}