import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useParams} from 'react-router-dom'
import {get, post} from '../../utils/requests'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {browserName} from 'react-device-detect'
import {debounce} from 'throttle-debounce'
import socketIOClient from 'socket.io-client'

const MESSAGE_EVENT = "newChatMessage"

function Chatbox({user}) {
  const {chatid} = useParams()
  const [inputField, setInputField] = useState("")
  const [chat, setChat] = useState([])
  const socketRef = useRef()

  // const debouncedTypingState = debounce(3000, setUserTyping)
  // const debouncedTypingTrigger = debounce(3000, typingTrigger)
  // let debounced
  const chatField = useRef("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (browserName === 'Chrome' || browserName === 'Firefox') {
      messagesEndRef.current.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})
    } else if (browserName === 'Safari') {
      messagesEndRef.current.scrollIntoView()
    }
  }

  // async function getMessages() {
  //   let data = await get(`/api/chat/${chatid}`)
  //   setChat(data.chat.messages)
  //   scrollToBottom()
  // }

  const getMessages = useCallback(async () => {
    let data = await get(`/api/chat/${chatid}`)
    setChat(data.chat.messages)
    scrollToBottom()
  }, [chatid])


  function inputHandler(e) {
    setInputField(e.target.value)
    chatField.current = e.target.value
    if (e.key === 'Enter') {
      sendMessage()
    }
    // if (chatField.current !== "" && userTyping === false) {
    //   // setUserTyping(true)
    //   typingTrigger(userInfo.username, true)
    //   // debouncedTypingState(false)
    //   debouncedTypingTrigger(userInfo.username, false)
    // } else if (chatField.current === "" && userTyping === true) {
    //   // debouncedTypingState(false)
    //   debouncedTypingTrigger(userInfo.username, false)
    // }
  }

  async function sendMessage() {
    if (inputField) {
      let res = await post(`/api/chat/${chatid}/message`, {
        senderid: user.id,
        content: inputField
      })
      if (res) {
        setInputField('')
        socketRef.current.emit(MESSAGE_EVENT, {chatid})
        // await getMessages()
      }
    }
  }

  let render = ""
  renderMessages()

  function renderMessages() {
    if (chat) {
      render = chat.map((message) => {
        if (message.sender._id === user.id) {
          return <div className="message-card user" key={message._id}>
            <div className="message-bubble user">
              <h6>You</h6>
              <p>{message.content}</p>
            </div>
          </div>
        } else {
          return <div className="message-card peer" key={message._id}>
            <div className="message-bubble peer">
              <h6>{message.sender.username}</h6>
              <p>{message.content}</p>
            </div>
          </div>
        }
      })
    }
  }

  useEffect(() => {
    if (user.username) {
      // create websocket connection
      socketRef.current = socketIOClient(process.env.SERVER, {
        query: {user: user.username, chatid: chatid}
      })

      socketRef.current.on(MESSAGE_EVENT, () => {
        console.log('received')
        getMessages()
      })
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [chatid, user])

  useEffect(() => {
    getMessages()
  }, [getMessages])

  useEffect(() => {
    renderMessages()
    scrollToBottom()
  }, [chat])


  return (
    <div className="chatbox">
      <h3>Chatbox</h3>

      <div className="messages-scroll-wrapper">
        <div className="messages-div">
          {render}
          <div ref={messagesEndRef}/>
        </div>
      </div>


      <div className="chat-bottom-div">
        <div className="chat-notif-div">
          {/*{userTyping ? <p>a participant is typing..</p> : ""}*/}
        </div>
        {user ? <p>{user.username}</p> : ""}
        <div className="chat-input-div">
          <input placeholder="say something..." onChange={inputHandler}
                 onKeyPress={e => e.key === 'Enter' ? sendMessage() : null} value={inputField}></input>
          <div className="send-button-div" onClick={sendMessage}><FontAwesomeIcon icon={faArrowUp}
                                                                                  className="send-icon"/></div>
        </div>
      </div>
    </div>
  );
}

Chatbox.propTypes = {
  user: PropTypes.object,
}

export default Chatbox;