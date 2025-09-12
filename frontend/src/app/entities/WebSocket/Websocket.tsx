import { useState, useEffect } from 'react'

interface WebSocketComponentProps {
  roomId: string
  userName: string
}

const WebSocketComponent = ({ roomId, userName }: WebSocketComponentProps) => {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/')
    setSocket(ws)

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'joinRoom', roomId, user: userName }))
    }

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
      setMessages((prev) => [...prev, parsed])
    }

    return () => ws.close()
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

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <b>{msg.user}:</b> {msg.message}
          </p>
        ))}
      </div>
      <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default WebSocketComponent
