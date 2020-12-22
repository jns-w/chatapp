import React, {useState, useEffect, useRef} from 'react';
import Axios from 'axios'
import {useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import '../../styles/chat.scss'
import {debounce} from 'throttle-debounce'

function Chatbox({chat, userInfo, pusherTrigger, userTyping}) {

  // const {eventid} = useParams()
  const [inputField, setInputField] = useState("")

  // const debouncedTypingState = debounce(3000, setUserTyping)
  // const debouncedTypingTrigger = debounce(3000, typingTrigger)
  // let debounced
  const chatField = useRef("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})
  }

  useEffect(() => {
    renderMessages()
    scrollToBottom()
  }, [chat])

  function inputHandler(e) {
    setInputField(e.target.value)
    chatField.current = e.target.value
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  async function sendMessage() {
    if (inputField !== "") {
      let token = localStorage.token
      try {
        await Axios.post(`api/`, {
            message: inputField
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        // getEventData()
        setInputField('')
      } catch (err) {
        console.log(err)
      }
    }
    renderMessages()
  }

  let render = ""

  renderMessages()

  function renderMessages() {
    if (chat !== undefined) {
      render = chat.map((message) => {
        if (message.username === userInfo.username) {
          return <div className="message-card user" key={message._id}>
            <div className="message-bubble user">
              <h6>You</h6>
              <p>{message.message}</p>
            </div>
          </div>
        } else {
          return <div className="message-card peer" key={message._id}>
            <div className="message-bubble peer">
              <h6>{message.username}</h6>
              <p>{message.message}</p>
            </div>
          </div>
        }
      })
    }
  }


  return (
    <div className="chatbox-div no-select">
      <h3>Chatbox</h3>

      <div className="messages-scroll-wrapper">
        <div className="messages-div">
          {render}
          <div ref={messagesEndRef}/>
        </div>
      </div>

      <div className="chat-bottom-div">
        <div className="chat-notif-div">
          {userTyping ? <p>a participant is typing..</p> : ""}
        </div>
        <div className="chat-input-div">
          <input placeholder="say something..." onChange={inputHandler} onKeyPress={e => e.key === 'Enter' ? sendMessage() : null} value={inputField}></input>
          <div className="send-button-div" onClick={sendMessage}><FontAwesomeIcon icon={faArrowUp} className="send-icon"/></div>
        </div>
      </div>


    </div>
  );
}

export default Chatbox;