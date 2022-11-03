import image from '@/assets/test.png'
import io, { Socket } from 'socket.io-client'
import constants from '@/constants'
import { PlayerData, UpdateMessage } from '@/message_objects'

export class Main extends Phaser.Scene {
  count: number
  angle: any
  rope: any
  socket: Socket

  constructor(config: string) {
    super(config)
    this.count = 0

    this.socket = io('http://localhost:3001', { transports: ['websocket'] })

    this.socket.connect()

    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    this.socket.emit(constants.NETWORK_MESSAGES.JOIN, { name: 'test' })

    this.socket.on(constants.NETWORK_MESSAGES.UPDATE, renderGame)

    function renderGame(updateMessage: UpdateMessage) {
      console.log('test', updateMessage.me.x, updateMessage.me.y)
      for (const enemy of updateMessage.enemies) {
        console.log('enemy', enemy.x, enemy.y)
      }
    }
  }
  preload(this: any) {
    this.load.image('toong', image)
  }

  create(this: any) {
    this.rope = this.add.sprite(500, 500, 'toong', null, 20)

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
