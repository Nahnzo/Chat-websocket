import { WebSocketServer } from 'ws'

// Глобально храним комнаты и клиентов
const rooms = {} // ключ: roomId, значение: Set(ws)

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  // Для каждого клиента своё текущее подключение к комнате
  let currentRoom = null

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString())
    console.log(parsed)

    switch (parsed.type) {
      case 'joinRoom':
        currentRoom = parsed.roomId || null
        if (!currentRoom) return
        if (!rooms[currentRoom]) rooms[currentRoom] = new Set()
        rooms[currentRoom].add(ws)
        break

      case 'newMessage':
        if (currentRoom && rooms[currentRoom]) {
          const messagePayload = JSON.stringify({
            user: parsed.user,
            message: parsed.message,
          })
          rooms[currentRoom].forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(messagePayload)
            }
          })
        }
        break
    }
  })

  ws.on('close', () => {
    if (currentRoom && rooms[currentRoom]) {
      rooms[currentRoom].delete(ws)
    }
  })
})
