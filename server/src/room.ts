import Player from './player'
import { Socket } from 'socket.io'

const UpdatePerSecond = 60

export default class Room {
    sockets:{[id:string]:Socket}
    players:{[id:string]:Player}

    constructor() {
        this.sockets = {}
        this.players = {}
        setInterval(this.update.bind(this), 1000 / UpdatePerSecond);
    }

    public addPlayer(socket: Socket, name: string) {
        this.players[socket.id] = new Player(name, 100, 100)
        this.sockets[socket.id] = socket
    }

    update() {
        
    }
}