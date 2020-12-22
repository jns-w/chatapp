const router = require('express').Router()
const e = require('express')
const User = require('../models/user.model')
const Chatroom = require('../models/chatroom.model')

router.get('/:chatid', async (req, res)=> {
  try {
    let user = User.findOne({username: req.username})
    let chatroom = Chatroom.findOne({_id: req.params.chatid})
  } catch (err) {
    return res.status(400).json({msg: "error"})
  }
})

module.exports = router