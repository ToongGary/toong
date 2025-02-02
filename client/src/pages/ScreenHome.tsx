import React from 'react'
import { BrowserRouter, Routes, Route, Navigation } from 'react-router-dom'
import { OneHome } from '@/pages/ToongHome'
import { TwoHome } from '@/pages/GariHome'

function ScreenHome() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OneHome />} />
        <Route path="/GariHome" element={<TwoHome />} />
        <Route path="/ToongHome" element={<OneHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default ScreenHome
