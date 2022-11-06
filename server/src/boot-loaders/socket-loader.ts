import { Socket } from 'socket.io'
import { SocketLoaderBase } from '../interfaces/socket-loader.interface'

export class SocketLoader {
  loaders: SocketLoaderBase[]

  constructor(...loaders: SocketLoaderBase[]) {
    this.loaders = loaders
  }

  public connectLoader(socket: Socket) {
    this.loaders.forEach((loader) => {
      loader.onConnection(socket)
    })
  }

  public disconnectLoader(socket: Socket) {
    this.loaders.forEach((loader) => {
      loader.onDisconnection(socket)
    })
  }
}
