import { SocketServer } from './boot-loaders/socket-server'
import { HttpServer } from './boot-loaders/http-server'

async function startServer() {
  const httpServer = new HttpServer().boot()
  new SocketServer(httpServer).boot()
}
startServer()
