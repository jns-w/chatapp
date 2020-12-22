const router = require('express').Router()
const e = require('express')
const User = require('../models/user.model')
const Chat = require('../models/chat.model')


/**
 * @METHOOD GET
 * @USE GET ALL CHATS
 * @URL /api/chat/all
 */

router.get('/all', async (req, res) => {
  try {
    let chats = await Chat.find()
    return res.status(200).json({msg: "success", chats})
  } catch (err) {
    return res.status(400).json({msg: "error"})
  }
})


/**
 * @METHOOD GET
 * @USE GET MESSAGES
 * @URL /api/chat/:chatid
 *
 */
router.get('/:chatid', async (req, res) => {
  try {
    // let user = User.findOne({username: req.username})
    let chat = await Chat.findById({_id: req.params.chatid}).populate({
      path: "messages",
      populate: {
        path: 'sender',
        model: 'User'
      }
    })
    return res.status(200).json({chat})
  } catch (err) {
    return res.status(400).json({msg: "error"})
  }
})

/**
 * @METHOOD POST
 * @USE NEW CHATROOM
 * @URL /api/chat/new
 *
 */
router.post('/new', async (req, res) => {
  try {
    let {name} = req.body
    let newChat = new Chat({name})
    await newChat.save()
    return res.status(200).json({msg: 'success'})
  } catch (err) {
    console.log(err)
    return res.status(400).json({msg: 'error'})
  }
})

/**
 * @METHOOD POST
 * @USE NEW MESSAGE
 * @URL /api/:chatid/message
 *
 */
router.post('/:chatid/message', async (req, res) => {
  try {
    let {senderid, content} = req.body
    let chat = await Chat.findById(req.params.chatid)
    // let sender = await User.findById(senderid)
    // console.log(sender)
    chat.messages.push({sender: senderid, content: content})
    await chat.save()
    return res.status(200).json({msg: 'message sent'})
  } catch (err) {
    console.log(err)
    return res.status(400).json({msg: 'error sending message'})
  }
})

module.exports = router