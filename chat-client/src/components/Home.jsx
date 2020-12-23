import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import {get, post, put} from "../utils/requests";
import {tokenCheck} from "../utils/auth";

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
      await tokenCheck(setUser)
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

  async function createNewChat() {
    await post('/api/chat/new')
    await getChats()
  }


  Object.keys(user).length !== 0 && getChats()

  let render = <div>set your one time username
    <input onChange={inputHandler} onKeyPress={e => e.key === 'Enter' && registerUser()} value={inputField}/>
  </div>
  if (user.username !== '') {
    render = <div>Hello {user.username} here are the chat roooms</div>
  }

  return (
    <div>
      {render}
      {chatrooms ? chatrooms.map((chat)=>(<NavLink to={`/chat/${chat._id}`}>{chat.name}</NavLink>)) : ""}
      <button onClick={createNewChat}>Create new</button>
    </div>
  );
}

export default Home;