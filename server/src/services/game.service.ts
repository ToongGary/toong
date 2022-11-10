import { InputMessage } from '../interfaces/message.interface'
import Player from '../objects/player.object'
import { EventEmitter } from 'events'
import { NETWORK_MESSAGES } from '../constants'
import { Coin } from '../objects/coin.object'
export class GameService {
  private eventEmitter: EventEmitter
  private players: Map<string, Player>
  private coins: Array<Coin>
  private maxCoins: number
  private areaSize: { width: number; height: number }

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter
    this.players = new Map()
    this.coins = []
    this.maxCoins = 60
    this.areaSize = { width: 1000, height: 1000 }
  }

  private generateCoin() {
    while (this.coins.length < this.maxCoins) {
      const coin = new Coin(10, 10)
      coin.setPosition(
        Math.floor(Math.random() * this.areaSize.width),
        Math.floor(Math.random() * this.areaSize.height)
      )
      this.coins.push(coin)
    }

    this.eventEmitter.emit(
      NETWORK_MESSAGES.UPDATE_COIN,
      this.coins.map((coin) => coin.getInfo())
    )
  }

  public join(id: string, name: string) {
    this.players.set(id, new Player(name, 100, 100, id))
    this.generateCoin()
  }

  public leave(id: string) {
    this.players.delete(id)
    this.generateCoin()
  }

  public userInput(id: string, input: InputMessage) {
    this.players.get(id)?.processInput(input)
  }

  public calculatePosition(id: string) {
    const player = this.players.get(id)
    player?.updatePosition()

    const enemies = [...this.players.values()]
      .filter((enemy) => {
        const isEnemy = enemy !== player
        const isInViewport = player?.playerInViewport(enemy)
        return isEnemy && isInViewport
      })
      .map((enemy) => {
        return enemy.getPosition()
      })

    return {
      enemies: enemies,
      me: player?.getPosition()
    }
  }
}
