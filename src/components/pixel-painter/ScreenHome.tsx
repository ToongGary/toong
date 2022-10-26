import React from 'react';
import { BrowserRouter, Routes, Route, Navigation } from 'react-router-dom';
import { OneHome } from '@components/pixel-painter/ToongHome'
import { TwoHome } from '@components/pixel-painter/GariHome'


function ScreenHome() {



    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<OneHome />} />
                <Route path='/GariHome' element={<TwoHome />} />
                <Route path='/ToongHome' element={<OneHome />} />

            </Routes>
        </BrowserRouter>
    )
}

export default ScreenHome;
