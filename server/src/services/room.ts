import Player from './player'
import { Socket } from 'socket.io'
import { InputMessage } from '../interfaces/message.interface'
import { NETWORK_MESSAGES } from '../constants'
import { SocketLoaderBase } from '../interfaces/socket-loader.interface'

const UpdatePerSecond = 10

export default class Room implements SocketLoaderBase {
  sockets: { [id: string]: Socket }
  players: { [id: string]: Player }

  constructor() {
    this.sockets = {}
    this.players = {}
    setInterval(this.update.bind(this), 1000 / UpdatePerSecond)
  }

  public onConnection(socket: Socket) {
    socket.on(NETWORK_MESSAGES.USER_INPUT, (input: InputMessage) => {
      this.processInput(socket, input)
    })

    socket.on(NETWORK_MESSAGES.JOIN, (username: string) => {
      this.addPlayer(socket, username)
    })
  }

  public onDisconnection(socket: Socket) {
    this.removePlayer(socket)
  }

  public addPlayer(socket: Socket, name: string) {
    console.log('User joined!', name)
    this.players[socket.id] = new Player(name, 100, 100, socket.id)
    this.sockets[socket.id] = socket
  }

  public removePlayer(socket: Socket) {
    delete this.sockets[socket.id]
    delete this.players[socket.id]
  }

  public processInput(socket: Socket, input: InputMessage) {
    const player = this.players[socket.id]
    if (!player) return
    player.processInput(input)
  }

  private broadcast() {
    for (const id in this.sockets) {
      const socket = this.sockets[id]
      const player = this.players[id]

      const playersInViewport = Object.values(this.players).filter((enemy) => {
        return enemy !== player && player.playerInViewport(enemy)
      })

      socket.emit(NETWORK_MESSAGES.UPDATE, {
        enemies: playersInViewport.map((enemy) => enemy.getPlayerData()),
        me: player.getPlayerData()
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
