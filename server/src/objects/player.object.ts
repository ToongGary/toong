import { InputMessage } from '../interfaces/message.interface'
import { PlayerData } from '../interfaces/player.interface'
import { MAX_AREA_SIZE } from '../constants'

export default class Player {
  id: string
  name: string
  x: number
  y: number
  hp: number
  score: number
  moving: boolean
  direction: number
  viewportSize: [number, number]

  constructor(name: string, x: number, y: number, id: string) {
    this.id = id
    this.name = name
    this.x = x
    this.y = y
    this.hp = 100
    this.score = 0
    this.moving = false
    this.direction = 0
    this.viewportSize = [1600, 800]
  }

  public isPlayerInViewport(player: Player): boolean {
    return (
      Math.abs(player.x - this.x) <= this.viewportSize[0] / 2 &&
      Math.abs(player.y - this.y) <= this.viewportSize[1] / 2
    )
  }

  public updatePosition() {
    if (this.moving) {
      this.x += Math.cos(this.direction) * 5
      this.y += Math.sin(this.direction) * 5
    }

    if (this.x < 0) this.x = 0
    if (this.y < 0) this.y = 0
    if (this.x > MAX_AREA_SIZE[0]) this.x = MAX_AREA_SIZE[0]
    if (this.y > MAX_AREA_SIZE[1]) this.y = MAX_AREA_SIZE[1]
  }

  public getPosition(): PlayerData {
    return {
      x: this.x,
      y: this.y,
      direction: this.direction
    }
  }

  public processInput(input: InputMessage) {
    this.moving = input.move
    this.direction = input.angle
  }
}
