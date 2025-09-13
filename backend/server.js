import { WebSocketServer } from 'ws'

const rooms = {}

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  let currentRoom = null
  let userName = null

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString())

    switch (parsed.type) {
      case 'joinRoom':
        currentRoom = parsed.roomId
        userName = parsed.user
        if (!rooms[currentRoom]) rooms[currentRoom] = new Set()
        rooms[currentRoom].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'userJoined', user: userName }))
          }
        })
        rooms[currentRoom].add(ws)
        break
      case 'newMessage':
        if (currentRoom && rooms[currentRoom]) {
          const messagePayload = JSON.stringify({
            type: 'newMessage',
            user: parsed.user,
            message: parsed.message,
          })
          rooms[currentRoom].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(messagePayload)
            }
          })
        }
        break
    }
  })

  ws.on('close', () => {
    if (currentRoom && userName && rooms[currentRoom]) {
      rooms[currentRoom].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'userLeft', user: userName }))
        }
      })
      rooms[currentRoom].delete(ws)
    }
  })
})
