import '@styles/common.css'
import { BrowserRouter, Routes, Route, Navigation } from 'react-router-dom'
import { OneHome } from '@/pages/ToongHome'
import { TwoHome } from '@/pages/GariHome'
import { PixelPainter } from '@/pages/PixelPainter'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OneHome />} />
        <Route path="/GariHome" element={<TwoHome />} />
        <Route path="/ToongHome" element={<OneHome />} />
        <Route path="/PixelPainter" element={<PixelPainter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
