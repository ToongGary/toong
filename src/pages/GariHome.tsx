import React from 'react'
import { Link } from 'react-router-dom'
import Phaser from 'phaser'
import { Main } from '@/scenes/main'

export class TwoHome extends React.Component {
  componentDidMount() {
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

// 홈페이지1 라우트
// 수정필요
