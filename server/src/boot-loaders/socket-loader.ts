import { Socket } from 'socket.io'

export interface ISocketLoader {
  onConnection: (socket: Socket) => void
  onDisconnection: (socket: Socket) => void
}

export class SocketLoader {
  loaders: ISocketLoader[]

  constructor(...loaders: ISocketLoader[]) {
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
