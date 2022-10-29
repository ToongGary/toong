import Canvas from '@components/pixel-painter/Canvas'
import ColorPalette from '@components/pixel-painter/ColorPalette'
import ColorPicker from '@components/pixel-painter/ColorPicker'
import Reset from '@components/pixel-painter/Reset'
import '@styles/common.css'
import Phaser from 'phaser'

function App() {
  const game: any = new Phaser.Game({
    width: 100,
    height: 100,
    type: Phaser.AUTO,
    parent: '',
    scene: {
      preload: preload,
      create: create
      // update: update
    }
  })

  function preload(this: any) {
    this.load.image('logo', 'assets/background.png')
  }

  function create(this: any) {
    this.add.image(100, 100, 'logo')
  }

  return (
    <div className="pixel-painter">
      <div>
        <Canvas
          canvasColumnCount={21}
          canvasRowCount={21}
          canvasCellWidth={20}
          canvasCellHeight={20}
        />
        <div>
          <div className={'toolbar'}>
            <ColorPicker />
            <Reset />
          </div>
          <ColorPalette />
        </div>
      </div>
    </div>
  )
}

export default App
