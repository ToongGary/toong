import React from 'react'
import { Link } from 'react-router-dom'
import Phaser from 'phaser'
import { Main } from '@/scenes/Main'

export class TwoHome extends React.Component {
  componentDidMount() {
    new Phaser.Game({
      scale: {
        parent: '_game-container',
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 800
      },

      type: Phaser.AUTO,
      scene: Main
    })
  }

  public render() {
    return <div id="game-container" />
  }
}
