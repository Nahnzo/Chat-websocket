import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })
wss.on('connection', (ws) => {
  console.log('Новый клиент подключился!')

  ws.on('message', (message) => {
    const messages = message.toString()
    console.log(`Получено сообщение: ${messages}`)
    console.log(messages)
    ws.send(messages)
  })

  ws.on('close', () => {
    console.log('Клиент отключился')
  })
})
