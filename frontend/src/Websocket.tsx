import { useState, useEffect } from 'react'

const WebSocketComponent = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
      console.log(event)
    }
    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [])

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputMessage)
      setInputMessage('')
    }
  }
  console.log(messages)

  return (
    <div>
      <h2>WebSocket клиент</h2>
      <div>
        <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
        <button onClick={sendMessage}>Отправить</button>
      </div>
      <div>
        <h3>Сообщения:</h3>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  )
}

export default WebSocketComponent
