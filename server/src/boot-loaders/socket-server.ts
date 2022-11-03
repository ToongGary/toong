import { Server, Socket } from 'socket.io'
import { NETWORK_MESSAGES } from '../constants'
import { InputMessage } from '../interfaces/message.interface'
import Room from '../services/room'

export class SocketServer {
  private io: Server
  private room: Room

  constructor(server: any) {
    this.io = new Server(server)
    this.room = new Room()
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

    socket.on(NETWORK_MESSAGES.USER_INPUT, (input: InputMessage) => {
      this.room.processInput(socket, input)
    })

    socket.on(NETWORK_MESSAGES.JOIN, (username: string) => {
      this.room.addPlayer(socket, username)
    })
  }

  private disconnectLoader(socket: Socket) {
    this.room.removePlayer(socket)
    console.log('socket disconnected', socket.id)
  }
}
