import React from 'react'
import { Link } from 'react-router-dom'
import Phaser from 'phaser'
import { Main } from '@/scenes/Main'
import io from 'socket.io-client'

export class TwoHome extends React.Component {
  componentDidMount() {
    const constants = require('@/constants')

    const socket = io('http://localhost:3001', { transports: ['websocket'] })

    socket.connect()

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on(constants.NETWORK_MESSAGE.UPDATE, renderGame)

    function renderGame() {}

    new Phaser.Game({
      width: 1000,
      height: 1000,
      type: Phaser.AUTO,
      parent: 'game-container',
      scene: Main
    })
  }

  public render() {
    return <div id="game-container" />
  }
}
