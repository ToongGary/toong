import Player from './player'
import { Socket } from 'socket.io'
import { InputMessage } from './message_objects'

const UpdatePerSecond = 60
const constants = require('./constants')

export default class Room {
  sockets: { [id: string]: Socket }
  players: { [id: string]: Player }

  constructor() {
    this.sockets = {}
    this.players = {}
    setInterval(this.update.bind(this), 1000 / UpdatePerSecond)
  }

  public addPlayer(socket: Socket, name: string) {
    this.players[socket.id] = new Player(name, 100, 100)
    this.sockets[socket.id] = socket
  }

  public processInput(socket: Socket, input: InputMessage) {
    let player = this.players[socket.id]
    player.processInput(input)
  }

  private broadcast() {
    for (let id in this.sockets) {
      let socket = this.sockets[id]
      let player = this.players[id]
      socket.emit(constants.NETWORK_MESSAGES.UPDATE, {
        x: player.x,
        y: player.y
      })
    }
  }

  private update() {
    for (let id in this.sockets) {
      let player = this.players[id]
      player.update()
    }

    this.broadcast()
  }
}
