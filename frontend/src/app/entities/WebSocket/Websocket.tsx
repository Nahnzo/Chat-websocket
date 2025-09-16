import { useState, useEffect } from 'react'
import classes from './webSocket.module.css'

interface WebSocketComponentProps {
  roomId: string
  userName: string
}

interface MessageData {
  type: 'userJoined' | 'userLeft' | 'newMessage'
  user?: string
  message?: string
  quantityUsers: number
}

const WebSocketComponent = ({ roomId, userName }: WebSocketComponentProps) => {
  const [messages, setMessages] = useState<MessageData[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/')
    setSocket(ws)

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'joinRoom', roomId, user: userName }))
    }

    ws.onmessage = (event) => {
      const parsed: MessageData = JSON.parse(event.data)
      setMessages((prev) => [...prev, parsed])
    }

    return () => {
      ws.send(JSON.stringify({ type: 'leftRoom', roomId, user: userName }))
      ws.close()
    }
  }, [roomId, userName])

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && inputMessage) {
      socket.send(
        JSON.stringify({
          type: 'newMessage',
          roomId,
          user: userName,
          message: inputMessage,
        })
      )
      setInputMessage('')
    }
  }
  if (messages[0] == null) {
    return <div>Download</div>
  }
  console.log(messages)

  return (
    <>
      <div>{messages[0].quantityUsers}</div>
      <div className={classes.messagesContainer}>
        {messages.map((msg, idx) => {
          if (msg.type === 'userJoined') {
            return (
              <p key={idx}>
                <i>{msg.user} joined the room</i>
              </p>
            )
          } else if (msg.type === 'userLeft') {
            return (
              <p key={idx}>
                <i>{msg.user} left the room</i>
              </p>
            )
          } else if (msg.type === 'newMessage') {
            return (
              <p key={idx}>
                <b>{msg.user}:</b> {msg.message}
              </p>
            )
          }
          return null
        })}
      </div>

      <div className={classes.inputContainer}>
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className={classes.input}
          placeholder="Send a message..."
        />
        <button onClick={sendMessage} className={classes.btnSend}>
          Send
        </button>
      </div>
    </>
  )
}

export default WebSocketComponent
