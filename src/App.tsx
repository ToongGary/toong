import Canvas from './components/pixel-painter/Canvas'
import ColorPalette from './components/pixel-painter/ColorPalette'
import ColorPicker from './components/pixel-painter/ColorPicker'
import Reset from './components/pixel-painter/Reset'
import './styles/common.css'

function App() {
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
