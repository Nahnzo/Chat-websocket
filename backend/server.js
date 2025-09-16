import { WebSocketServer } from 'ws'

const rooms = {}

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  let currentRoom = null
  let userName = null

  const broadcast = (roomId, message) => {
    if (!rooms[roomId]) return
    for (const client of rooms[roomId]) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(message))
      }
    }
  }

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString())

    switch (parsed.type) {
      case 'joinRoom':
        currentRoom = parsed.roomId
        userName = parsed.user

        if (!rooms[currentRoom]) rooms[currentRoom] = new Set()

        rooms[currentRoom].add(ws)

        const activeClientsJoin = Array.from(rooms[currentRoom]).filter(
          (client) => client.readyState === ws.OPEN
        )

        broadcast(currentRoom, {
          type: 'userJoined',
          user: userName,
          quantityUsers: activeClientsJoin.length,
        })
        break

      case 'newMessage':
        if (currentRoom && rooms[currentRoom]) {
          broadcast(currentRoom, {
            type: 'newMessage',
            user: parsed.user,
            message: parsed.message,
          })
        }
        break
    }
  })

  ws.on('close', () => {
    if (currentRoom && userName && rooms[currentRoom]) {
      rooms[currentRoom].delete(ws)

      const activeClientsClose = Array.from(rooms[currentRoom]).filter(
        (client) => client.readyState === ws.OPEN
      )

      broadcast(currentRoom, {
        type: 'userLeft',
        user: userName,
        quantityUsers: activeClientsClose.length,
      })

      if (activeClientsClose.length === 0) {
        delete rooms[currentRoom]
      }
    }
  })
})
