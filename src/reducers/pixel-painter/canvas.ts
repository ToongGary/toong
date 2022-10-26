import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CanvasState {
  clear: boolean
  color: string
}

const initialState: CanvasState = {
  clear: false,
  color: '#000000'
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setClear: (state, action: PayloadAction<boolean>) => {
      state.clear = action.payload
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClear, setColor } = canvasSlice.actions

export default canvasSlice.reducer
