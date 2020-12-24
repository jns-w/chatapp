const jwt = require('jsonwebtoken')
require('dotenv').config()

async function validToken(token) {
  try {
    const verify = await jwt.verify(token, process.env.SECRET)
    console.log(!!verify)
    return !!verify;
  } catch (err) {
    console.log("invalid token")
    return false
  }
}


module.exports = {validToken}