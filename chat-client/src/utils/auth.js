import jwt from 'jsonwebtoken'
import {put} from "./requests";

async function tokenCheck(setUser) {
  try {
    console.log("doing token check")
    let token = localStorage.getItem("token")
    let decodedToken = jwt.decode(token)
    let id = decodedToken.id
    if (token) {
      let data = await put('/api/user/getusername', {
        token: token
      })
      if (data) {
        setUser({id: id, username: data.username})
      }
    }
  } catch (err) {
    console.log(err)
  }
}


export {tokenCheck}