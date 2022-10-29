import image from '@/assets/test.png'

export class Main extends Phaser.Scene {
  count: number

  constructor(config: string) {
    super(config)
    this.count = 0
  }
  preload(this: any) {
    this.load.image('toong', image)
  }

  create(this: any) {
    this.rope = this.add.rope(400, 300, 'toong', null, 20)
  }
  update(this: any) {
    this.count += 0.1

    const points = this.rope.points

    for (let i = 0; i < points.length; i++) {
      console.log(i * Math.PI, Math.sin(i * Math.PI))
      points[i].y = Math.sin((i * Math.PI) / 19) * 30 * Math.sin(this.count * 2)
    }

    this.rope.setDirty()
  }
}
