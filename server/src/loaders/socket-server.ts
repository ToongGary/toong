import { Server, Socket } from 'socket.io'
import { NETWORK_MESSAGES } from '../constants'
import { InputMessage } from '../message_objects'
import Room from '../room'

export class SocketServer {
  private io: Server

  constructor(server: any) {
    this.io = new Server(server)
  }

  public boot() {
    this.io.on('connection', (socket) => {
      this.connectLoader(socket)

      socket.on('disconnect', () => {
        this.disconnectLoader(socket)
      })
    })
  }

  private connectLoader(socket: Socket) {
    console.log('socket connected', socket.id)

    const room = new Room()

    socket.on(NETWORK_MESSAGES.USER_INPUT, (input: InputMessage) => {
      room.processInput(socket, input)
    })

    socket.on(NETWORK_MESSAGES.JOIN, (username: string) => {
      room.addPlayer(socket, username)
    })
  }

  private disconnectLoader(socket: Socket) {
    console.log('socket disconnected', socket.id)
  }
}
