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

server.use(middlewares)
server.use(router)

server.listen(3000, () => console.log('JSON Server is running on 3000'))
