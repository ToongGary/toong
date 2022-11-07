import { SocketServer } from './boot-loaders/socket-server'
import { HttpServer } from './boot-loaders/http-server'
import { GameController } from './controllers/game.controller'

async function startServer() {
  const httpServer = new HttpServer().boot()
  new SocketServer(httpServer, [new GameController()]).boot()
}
startServer()
