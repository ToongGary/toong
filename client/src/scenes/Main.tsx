import image from '@/assets/test.png'
import coinImage from '@/assets/coin.png'
import io, { Socket } from 'socket.io-client'
import constants from '@/constants'
import { PlayerData, UpdateMessage, CoinMessage } from '@/message_objects'
import background from '@/assets/background.png'

class Enemy {
  x: number
  y: number
  sprite: Phaser.GameObjects.Sprite
  updated = true
  angle: number

  constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
    this.x = x
    this.y = y
    this.angle = angle
    this.sprite = scene.add.sprite(x, y, 'toong')
    this.sprite.setRotation(this.angle)
  }

  update(x: number, y: number, angle: number) {
    this.x = x
    this.y = y
    this.angle = angle
    this.sprite.setPosition(this.x, this.y)
    this.sprite.setRotation(this.angle)
    this.updated = true
  }
}

class Coin {
  x: number
  y: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class Main extends Phaser.Scene {
  count = 0
  angle: any
  rope: any
  socket: Socket
  enemies: { [id: string]: Enemy } = {}
  coins: Coin[] = []
  coinSprites: Coin[] = []
  viewportSize = [1600, 800]
  x = 0
  y = 0

  constructor(config: string) {
    super(config)

    // this.socket = io('172.30.1.74:3001', { transports: ['websocket'] })
    this.socket = io('localhost:3001', { transports: ['websocket'] })

    this.socket.connect()

    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    this.socket.on(constants.NETWORK_MESSAGES.INIT_COIN, (coinMessage: CoinMessage[]) => {
      this.initCoin(coinMessage)
    })

    this.socket.emit(constants.NETWORK_MESSAGES.JOIN, { name: 'test' })

    this.socket.on(constants.NETWORK_MESSAGES.UPDATE, (updateMessage: UpdateMessage) => {
      this.renderGame(updateMessage)
    })
  }

  initCoin(coinMessage: CoinMessage[]) {
    console.log(coinMessage)
    this.coins = coinMessage.map((coin) => {
      return new Coin(this, coin.x, coin.y)
    })
  }

  renderGame(updateMessage: UpdateMessage) {
    this.angle = updateMessage.me.direction
    this.x = updateMessage.me.x
    this.y = updateMessage.me.y
    for (const enemy of updateMessage.enemies) {
      const relativsX = enemy.x - updateMessage.me.x + this.rope.x
      const relativsY = enemy.y - updateMessage.me.y + this.rope.y

      if (enemy.id in this.enemies) {
        this.enemies[enemy.id].update(relativsX, relativsY, enemy.direction)
      } else {
        this.enemies[enemy.id] = new Enemy(this, relativsX, relativsY, enemy.direction)
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
    // this.load.image('coin', coinImage)
    this.load.image('toong', image)
    this.load.image('toongBackground', background)
  }

  create(this: any) {
    const container = this.add.container(1000, 1000).setName('tool')
    this.add.tileSprite(200, 500, 6000, 1000, 'toongBackground').setName('toongTile')
    const image = this.add.image(0, 0, 'toongBackground').setName('toongBackground').setScale(4)
    container.add(image)

    this.input.on(
      'pointerup',
      function (this: any) {
        this.scene.stop(false)
      },
      this
    )
    //add tile map to scenes

    this.rope = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'toong')

    this.input.on('pointermove', (pointer: any) => {
      let move: boolean
      if (this.rope.getBounds().contains(pointer.x, pointer.y)) {
        move = false
      } else {
        move = true
      }

      this.socket.emit(constants.NETWORK_MESSAGES.USER_INPUT, {
        move: move,
        angle: Phaser.Math.Angle.BetweenPoints(this.rope, pointer)
      })
    })
  }

  update(this: any, iter: number) {
    this.tilePositionX = Math.cos(-this.count) * 8
    this.tilePositionY = Math.sin(-this.count) * 8
    this.count += 0.2

    // for (let i = 0; i < this.coins.length; i++) {
    //   let coin = this.coins[i]
    //   if (
    //     Math.abs(coin.x - this.x) < this.viewportSize[0] / 2 &&
    //     Math.abs(coin.y - this.y) < this.viewportSize[1] / 2
    //   ) {
    //     this.visibleCoins[i] = coin
    //   }
    // }

    // const points = this.rope.points

    // for (let i = 0; i < points.length; i++) {
    //   points[i].y = Math.sin((i * Math.PI) / 19) * 30 * Math.sin(this.count * 2)
    // }

    // this.rope.setDirty()
    this.rope.rotation = this.angle
  }
}
