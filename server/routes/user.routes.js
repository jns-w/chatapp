const router = require('express').Router()
const e = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @METHOD GET
 * @USE CHECK USERNAME
 * @URL /api/checkusername
 */
router.get('/', async (req, res) => {
  try {
    let {searchField} = req.body
    console.log(searchField)
    res.status(200).json({msg: "match"})
  } catch (err) {
    res.status(400).json({msg: "error"})
  }
})

/**
 * @METHOD PUT
 * @USE ADD USER
 * @URL /api/user/new
 */
router.put('/new', async (req, res) => {
  try {
    let {username} = req.body
    let newUser = new User({
      username: username
    })
    await newUser.save()
    let token = await jwt.sign({id: newUser._id}, process.env.SECRET)
    res.status(200).json({msg: "user created", token: token})
  } catch (err) {
    console.log(err)
    res.status(400).json({msg: "error"})
  }
})

/**
 * @METHOD PUT
 * @USE GET USERNAME
 * @URL /api/user/getusername
 */
router.put('/getusername', async (req, res) => {
  try {
    let {token} = req.body
    let decodedToken = jwt.decode(token)
    let user = await User.findById(decodedToken.id)
    res.status(200).json({msg: "success", username: user.username})
  } catch (err) {
    res.status(400)
  }
})

module.exports = router