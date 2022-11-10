import { EventEmitter } from 'events'
import { Socket } from 'socket.io'
import { SocketLoaderBase } from '../boot-loaders/socket-loader'
import { NETWORK_MESSAGES } from '../constants'
import { InputMessage } from '../interfaces/message.interface'
import { Coin } from '../objects/coin.object'
import { GameService } from '../services/game.service'

export class GameController implements SocketLoaderBase {
  private GameService: GameService
  private sockets: Map<string, Socket>
  private eventEmitter: EventEmitter

  constructor() {
    this.eventEmitter = new EventEmitter()
    this.GameService = new GameService(this.eventEmitter)
    this.sockets = new Map()

    this.setBroadcast()
  }

  private setBroadcast() {
    setInterval(() => {
      this.emitUpdatePlayer(NETWORK_MESSAGES.UPDATE)
    }, 10)

    this.eventEmitter.on(NETWORK_MESSAGES.UPDATE_COIN, (coins: Coin[]) => {
      this.emitUpdateCoin(NETWORK_MESSAGES.UPDATE_COIN, coins)
    })
  }

  public onConnection(socket: Socket) {
    this.sockets.set(socket.id, socket)

    socket.on(NETWORK_MESSAGES.JOIN, (data) =>
      this.listenUserJoin(socket, data)
    )

    socket.on(NETWORK_MESSAGES.USER_INPUT, (data) =>
      this.listenUserInput(socket, data)
    )
  }

  public onDisconnection(socket: Socket) {
    this.sockets.delete(socket.id)
    this.GameService.leave(socket.id)
  }

  private listenUserJoin(socket: Socket, { name }: { name: string }) {
    this.GameService.join(socket.id, name)
  }

  private listenUserInput(socket: Socket, input: InputMessage) {
    this.GameService.userInput(socket.id, input)
  }

  private emitUpdatePlayer(message: NETWORK_MESSAGES.UPDATE) {
    for (const socket of this.sockets.values()) {
      socket.emit(message, this.GameService.calculatePosition(socket.id))
    }
  }

  private emitUpdateCoin(message: NETWORK_MESSAGES.UPDATE_COIN, coins: Coin[]) {
    for (const socket of this.sockets.values()) {
      socket.emit(message, this.GameService.calculatePosition(socket.id), coins)
    }
  }
}
