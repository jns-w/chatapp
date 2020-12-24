import jwt from 'jsonwebtoken'
import {put} from "./requests";
import {getLocalStorage} from "./browser";
require('dotenv').config()

async function tokenCheck(setUser) {
  try {
    console.log("doing token check")
    let token = getLocalStorage('token')
    let decodedToken = await jwt.verify(token, process.env.REACT_APP_SECRET)
    let id = decodedToken.id
    if (token) {
      let data = await put('/api/user/getusername', {
        token: token
      })
      if (data) {
        setUser({id: id, username: data.username})
        console.log(`${data.username} set`)
      }
    }
  } catch (err) {
    console.log(err)
  }
}


export {tokenCheck}