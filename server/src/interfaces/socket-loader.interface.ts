import { Socket } from 'socket.io'

export interface SocketLoaderBase {
  onConnection: (socket: Socket) => void
  onDisconnection: (socket: Socket) => void
}
