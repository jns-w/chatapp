const mongoose = require('mongoose')
const {Schema} = mongoose


const messageSchema = new Schema({
  username: String,
  message: String,
},
{
  timestamps: true
}
)

const chatroomSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'chatroom'
  },
  messages: [messageSchema]
})

chatroomSchema.pre('save', function (next) {
  let chatroom = this;

})