import '@styles/pixel-painter/color-picker.css'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setColor } from '@reducers/pixel-painter/canvas'

function ColorPicker() {
  const currentColor = useAppSelector((state) => state.canvas.color)
  const dispatch = useAppDispatch()
  const style = {
    backgroundColor: currentColor
  }

  return (
    <label className={'color-picker'} style={style}>
      <input type="color" onInput={onColorInput} value={currentColor}></input>
    </label>
  )

  function onColorInput(event: React.MouseEvent<HTMLInputElement, Event>) {
    const target = event.target as HTMLInputElement
    const color = target.value
    dispatch(setColor(color))
  }
}

export default ColorPicker
