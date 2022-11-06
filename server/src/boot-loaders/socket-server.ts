import { Server } from 'socket.io'
import { SocketLoaderBase } from '../interfaces/socket-loader.interface'
import { SocketLoader } from './socket-loader'

export class SocketServer {
  private io: Server
  private loaders: SocketLoaderBase[]

  constructor(server: any, loaders: SocketLoaderBase[] = []) {
    this.io = new Server(server)
    this.loaders = loaders
  }

  public boot() {
    const loader = new SocketLoader(...this.loaders)

    this.io.on('connection', (socket) => {
      loader.connectLoader(socket)

      socket.on('disconnect', () => {
        loader.disconnectLoader(socket)
      })
    })
  }
}
