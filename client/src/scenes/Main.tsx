import image from '@/assets/test.png'
export class Main extends Phaser.Scene {
  count: number
  angle: any

  constructor(config: string) {
    super(config)
    this.count = 0
  }
  preload(this: any) {
    this.load.image('toong', image)
  }

  create(this: any) {
    this.rope = this.add.rope(400, 300, 'toong', null, 20)

    this.input.on('pointermove', (pointer: any) => {
      this.angle = Phaser.Math.Angle.BetweenPoints(this.rope, pointer)
    })
  }

  update(this: any) {
    this.count += 0.1

    const points = this.rope.points

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.sin((i * Math.PI) / 19) * 30 * Math.sin(this.count * 2)
    }

    this.rope.setDirty()
    this.rope.rotation = this.angle
  }
}
