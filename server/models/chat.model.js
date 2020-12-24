const mongoose = require('mongoose');

const {Schema} = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'chatroom',
  },
  messages: [messageSchema],
  activeUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
  ]
});

// chatSchema.methods.updateActive = async function (userID) {
//   try {
//     this.activeUsers.push(userID)
//     console.log(`current active users`, chat.activeUsers)
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat