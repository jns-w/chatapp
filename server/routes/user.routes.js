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
    console.log(username)
    let newUser = new User({
      username: username
    })
    await newUser.save()
    let token = await jwt.sign({username: username, id: newUser._id}, process.env.SECRET)
    res.status(200).json({msg: "user created", token: token})
  } catch (err) {
    console.log(err)
    res.status(400).json({msg: "error"})
  }
})

module.exports = router