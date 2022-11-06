import { SocketServer } from './boot-loaders/socket-server'
import { HttpServer } from './boot-loaders/http-server'
import Room from './services/room'

async function startServer() {
  const httpServer = new HttpServer().boot()
  new SocketServer(httpServer, [new Room()]).boot()
}
startServer()
