import Player from './player'

const UpdatePerSecond = 60

class Room {
    sockets:any[]
    players:Player[]

    constructor() {
        this.sockets = []
        this.players = []
        setInterval(this.update.bind(this), 1000 / UpdatePerSecond);
    }

    update() {
        // update game state
    }
}