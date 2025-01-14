import '@styles/pixel-painter/reset.css'
import { useAppDispatch } from '@/hooks'
import { setClear } from '@reducers/pixel-painter/canvas'

function Reset() {
  const dispatch = useAppDispatch()

  const clearCanvas = () => {
    dispatch(setClear(true))
  }

  return (
    <button className="reset" onClick={clearCanvas}>
      Reset
    </button>
  )
}

export default Reset
