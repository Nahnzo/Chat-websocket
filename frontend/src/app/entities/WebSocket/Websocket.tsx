import { useState, useEffect } from 'react'
import classes from './webSocket.module.css'
import { EventsChat } from 'components/EventsChat'

interface WebSocketComponentProps {
  roomId: string
  userName: string
}

export type MessageData =
  | {
      type: 'userJoined'
      user: string
      userNameColor: string
      quantityUsers: number
    }
  | {
      type: 'userLeft'
      user: string
      quantityUsers: number
    }
  | {
      type: 'newMessage'
      user: string
      message: string
      userNameColor: string
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

  return (
    <>
      <EventsChat messages={messages} />
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
