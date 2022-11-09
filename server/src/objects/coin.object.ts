export class Coin {
  private width: number
  private height: number
  private x: number
  private y: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.x = 0
    this.y = 0
  }

  public setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public getInfo() {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }
}
