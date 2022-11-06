import image from '@/assets/test.png'
import io, { Socket } from 'socket.io-client'
import constants from '@/constants'
import { PlayerData, UpdateMessage } from '@/message_objects'

class Enemy {
  x: number
  y: number
  sprite: Phaser.GameObjects.Sprite
  updated = true

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.x = x
    this.y = y
    this.sprite = scene.add.sprite(x, y, 'toong')
  }

  update(x: number, y: number) {
    this.x = x
    this.y = y
    this.sprite.setPosition(this.x, this.y)
    this.updated = true
  }
}

export class Main extends Phaser.Scene {
  count: number
  angle: any
  rope: any
  socket: Socket
  enemies: { [id: string]: Enemy }

  constructor(config: string) {
    super(config)

    this.count = 0
    this.enemies = {}

    this.socket = io('http://localhost:3001', { transports: ['websocket'] })

    this.socket.connect()

    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    this.socket.emit(constants.NETWORK_MESSAGES.JOIN, { name: 'test' })

    this.socket.on(constants.NETWORK_MESSAGES.UPDATE, (updateMessage: UpdateMessage) => {
      this.renderGame(updateMessage)
    })
  }

  renderGame(updateMessage: UpdateMessage) {
    console.log('test', updateMessage.me.x, updateMessage.me.y)
    for (const enemy of updateMessage.enemies) {
      const relativsX = enemy.x - updateMessage.me.x
      const relativsY = enemy.y - updateMessage.me.y

      console.log('eneny', relativsX, relativsY)

      if (enemy.id in this.enemies) {
        this.enemies[enemy.id].update(relativsX, relativsY)
      } else {
        this.enemies[enemy.id] = new Enemy(this, relativsX, relativsY)
      }
    }
    for (const exsistingEnemyId of Object.keys(this.enemies)) {
      const exsistingEnemy = this.enemies[exsistingEnemyId]
      if (!exsistingEnemy.updated) {
        exsistingEnemy.sprite.destroy()
        delete this.enemies[exsistingEnemyId]
      } else {
        exsistingEnemy.updated = false
      }
    }
  }

  preload(this: any) {
    this.load.image('toong', image)
  }

  create(this: any) {
    this.rope = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'toong')

    this.input.on('pointermove', (pointer: any) => {
      let move: boolean
      if (this.rope.getBounds().contains(pointer.x, pointer.y)) {
        move = false
      } else {
        move = true
        this.angle = Phaser.Math.Angle.BetweenPoints(this.rope, pointer)
      }

      this.socket.emit(constants.NETWORK_MESSAGES.USER_INPUT, { move: move, angle: this.angle })
    })
  }

  update(this: any) {
    this.count += 0.1

    // const points = this.rope.points

    // for (let i = 0; i < points.length; i++) {
    //   points[i].y = Math.sin((i * Math.PI) / 19) * 30 * Math.sin(this.count * 2)
    // }

    // this.rope.setDirty()
    this.rope.rotation = this.angle
  }
}
