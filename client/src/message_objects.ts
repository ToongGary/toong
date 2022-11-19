export interface InputMessage {
  move: boolean
  angle: number
}

export interface PlayerData {
  id: string
  x: number
  y: number
  direction: number
}

export interface UpdateMessage {
  me: PlayerData
  enemies: PlayerData[]
}
export interface CoinMessage {
  x: number
  y: number
  width: number
  height: number
}