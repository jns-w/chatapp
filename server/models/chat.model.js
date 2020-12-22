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
});

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat