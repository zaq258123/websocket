const Koa = require('koa')
const app = new Koa()
const SocketServer = require('ws').Server
const path = require('path')
const static = require('koa-static')

const PORT = 3000

app.use(static(path.join(__dirname, './static')))

const server = app.listen(PORT, () => {
  console.log(`listen on ${PORT}`)
})

const wss = new SocketServer({ server })

wss.on('connection', (ws) => {
  console.log('client connected')
  ws.on('message', (data) => {
    let clients = wss.clients
    clients.forEach((client, i) => {
      client.send(data)
    })
  })
  ws.on('close', () => {
    console.log('close connected')
  })
})
