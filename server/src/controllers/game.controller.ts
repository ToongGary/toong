import { Socket } from 'socket.io'
import { NETWORK_MESSAGES } from '../constants'
import { InputMessage } from '../interfaces/message.interface'
import { SocketLoaderBase } from '../interfaces/socket-loader.interface'
import { GameService } from '../services/game.service'

export class GameController implements SocketLoaderBase {
  private GameService: GameService
  private sockets: Map<string, Socket>

  constructor() {
    this.GameService = new GameService()
    this.sockets = new Map()

    setInterval(this.onBroadcast.bind(this), 10)
  }

  public onConnection(socket: Socket) {
    this.sockets.set(socket.id, socket)

    socket.on(NETWORK_MESSAGES.JOIN, (data) => this.listenJoin(socket, data))

    socket.on(NETWORK_MESSAGES.USER_INPUT, (data) =>
      this.listenUserInput(socket, data)
    )
  }

  public onDisconnection(socket: Socket) {
    this.sockets.delete(socket.id)
    this.GameService.leave(socket.id)
  }

  private onBroadcast() {
    this.emitUpdate(NETWORK_MESSAGES.UPDATE)
  }

  private listenJoin(socket: Socket, { name }: { name: string }) {
    this.GameService.join(socket.id, name)
  }

  private listenUserInput(socket: Socket, input: InputMessage) {
    this.GameService.userInput(socket.id, input)
  }

  private emitUpdate(message: NETWORK_MESSAGES.UPDATE) {
    for (const socket of this.sockets.values()) {
      this.GameService.update(socket.id)
      socket.emit(message, this.GameService.calculatePosition(socket.id))
    }
  }
}
