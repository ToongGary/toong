import { InputMessage } from '../interfaces/message.interface'
import Player from '../objects/player.object'

export class GameService {
  private Players: Map<string, Player>

  constructor() {
    this.Players = new Map()
  }

  public join(id: string, name: string) {
    this.Players.set(id, new Player(name, 100, 100, id))
  }

  public leave(id: string) {
    this.Players.delete(id)
  }

  public userInput(id: string, input: InputMessage) {
    this.Players.get(id)?.processInput(input)
  }

  public update(id: string) {
    const player = this.Players.get(id)
    player?.update()
  }

  public calculatePosition(id: string) {
    const player = this.Players.get(id)

    const enemies = [...this.Players.values()]
      .filter((enemy) => {
        const isEnemy = enemy !== player
        const isInViewport = player?.playerInViewport(enemy)
        return isEnemy && isInViewport
      })
      .map((enemy) => {
        return enemy.getPlayerData()
      })

    return {
      enemies: enemies,
      me: player?.getPlayerData()
    }
  }
}
