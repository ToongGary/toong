import Player from './player'
import { Socket } from 'socket.io'
import { InputMessage } from '../interfaces/message.interface'
import { NETWORK_MESSAGES } from '../constants'

const UpdatePerSecond = 60

export default class Room {
  sockets: { [id: string]: Socket }
  players: { [id: string]: Player }

  constructor() {
    this.sockets = {}
    this.players = {}
    setInterval(this.update.bind(this), 1000 / UpdatePerSecond)
  }

  public addPlayer(socket: Socket, name: string) {
    console.log('User joined!', name)
    this.players[socket.id] = new Player(name, 100, 100)
    this.sockets[socket.id] = socket
  }

  public processInput(socket: Socket, input: InputMessage) {
    const player = this.players[socket.id]
    player.processInput(input)
  }

  private broadcast() {
    for (const id in this.sockets) {
      const socket = this.sockets[id]
      const player = this.players[id]
      socket.emit(NETWORK_MESSAGES.UPDATE, {
        x: player.x,
        y: player.y
      })
    }
  }

  private update() {
    for (const id in this.sockets) {
      const player = this.players[id]
      player.update()
    }

    this.broadcast()
  }
}
