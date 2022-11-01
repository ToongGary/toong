import { SocketServer } from './loaders/socket-server'
import { HttpServer } from './loaders/http-server'

async function startServer() {
  const httpServer = new HttpServer().boot()
  new SocketServer(httpServer).boot()
}
startServer()
