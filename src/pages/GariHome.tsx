import React from 'react'
import { Link } from 'react-router-dom'
import Phaser from 'phaser'

export class TwoHome extends React.Component {
  componentDidMount() {
    new Phaser.Game({
      width: 1000,
      height: 1000,
      type: Phaser.AUTO,
      parent: 'game-container',
      scene: {
        preload: preload,
        create: create
        // update: update
      }
    })
    function preload(this: any) {
      this.load.image('toong', 'assets/background.png')
    }

    function create(this: any) {
      const toong = this.add.sprite(100, 100, 'toong')
    }
  }

  public render() {
    return <div id="game-container" />
  }
}

// 홈페이지1 라우트
// 수정필요
