import { Server } from 'socket.io'
import { ISocketLoader, SocketLoader } from './socket-loader'

export class SocketServer {
  private io: Server
  private loaders: ISocketLoader[]

  constructor(server: any, loaders: ISocketLoader[] = []) {
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
