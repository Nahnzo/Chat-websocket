import jsonServer from 'json-server'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = jsonServer.router(join(__dirname, 'db.json'))

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

server.post('/register', (req, res) => {
  const { username, password } = req.body

  const users = router.db.get('users').value()

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: 'User already exists' })
  }

  const newUser = { id: Date.now(), username, password }
  router.db.get('users').push(newUser).write()
  res.status(201).json(newUser)
})

server.post('/login', (req, res) => {
  const { username, password } = req.body

  const users = router.db.get('users').value()

  const isValidPassword = users.find((u) => u.password === password)
  const isValidLogin = users.find((u) => u.username === username)

  if (!isValidLogin || !isValidPassword) {
    return res.status(400).json({ error: 'Wrong password or login' })
  }

  res.status(201).json({ message: 'Succeeded!' })
})

server.post('/createRoom', (req, res) => {
  const { username, typeRoom, roomName } = req.body

  const rooms = router.db.get('rooms').value()
  const isValidRoomName = rooms.find((u) => u.roomName === roomName)

  if (isValidRoomName) {
    return res.status(400).json({ error: 'Комната с таким именем уже существует' })
  }
  const newRoom = { id: Date.now(), createdBy: username, typeRoom, roomName }
  router.db.get('rooms').push(newRoom).write()
  res.status(201).json(newRoom)
})

server.use(middlewares)
server.use(router)

server.listen(3000, () => console.log('JSON Server is running on 3000'))
