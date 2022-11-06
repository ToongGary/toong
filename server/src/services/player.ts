import { InputMessage, PlayerData } from '../interfaces/message.interface'

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
  maxAreaSize: [number, number]

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
    this.maxAreaSize = [10000, 10000]
  }

  public playerInViewport(player: Player): boolean {
    console.log(
      Math.abs(player.x - this.x),
      Math.abs(player.y - this.y),
      Math.abs(player.x - this.x) <= this.viewportSize[0] / 2 &&
        Math.abs(player.y - this.y) <= this.viewportSize[1] / 2
    )
    return (
      Math.abs(player.x - this.x) <= this.viewportSize[0] / 2 &&
      Math.abs(player.y - this.y) <= this.viewportSize[1] / 2
    )
  }

  public update() {
    if (this.moving) {
      this.x += Math.cos(this.direction) * 5
      this.y += Math.sin(this.direction) * 5
    }

    if (this.x < 0) this.x = 0
    if (this.y < 0) this.y = 0
    if (this.x > this.maxAreaSize[0]) this.x = this.maxAreaSize[0]
    if (this.y > this.maxAreaSize[1]) this.y = this.maxAreaSize[1]
  }

  public getPlayerData(): PlayerData {
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
