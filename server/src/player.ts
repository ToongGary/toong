import { InputMessage } from './interfaces/message.interface'

export default class Player {
  name: string
  x: number
  y: number
  hp: number
  score: number
  moving: boolean
  angle: number

  constructor(name: string, x: number, y: number) {
    this.name = name
    this.x = x
    this.y = y
    this.hp = 100
    this.score = 0
    this.moving = false
    this.angle = 0
  }

  public update() {
    if (this.moving) {
      this.x += Math.cos(this.angle) * 5
      this.y += Math.sin(this.angle) * 5
    }
  }

  public processInput(input: InputMessage) {
    this.moving = input.move
    this.angle = input.angle
  }
}
