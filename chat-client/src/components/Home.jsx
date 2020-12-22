import React, {useState, useRef} from 'react';
import {get, put} from "../utils/requests";
import {decode} from 'jsonwebtoken'

function Home({user, setUser}) {
  const [inputField, setInputField] = useState('')
  const [chatrooms, setChatrooms] = useState([])

  async function registerUser() {
    let data = await put('/api/user/new', {
      username: inputField
    })
    if (data) {
      setInputField('')
      localStorage.setItem("token", data.token)
      let decodedUser = await decode(data.token)
      console.log(decodedUser)
      setUser({username: decodedUser.username, id: decodedUser.id})
    }
  }

  function inputHandler(e) {
    setInputField(e.target.value)
    if (e.key === 'Enter') {
      registerUser()
    }
  }


  async function getChats() {
    let data = await get('/api/chat/all')
    setChatrooms(data.chats)
  }


  Object.keys(user).length !== 0 && getChats()

  let render = <div>set your one time username
    <input onChange={inputHandler} onKeyPress={e => e.key === 'Enter' && registerUser()} value={inputField}/>
  </div>
  if (Object.keys(user).length !== 0) {
    render = <div>Hello {user.username} here are the chat roooms</div>
  }

  return (
    <div>
      {render}
      {chatrooms ? chatrooms.map((chat)=>(<p>{chat.name}</p>)) : ""}
    </div>
  );
}

export default Home;