export interface InputMessage {
  move: boolean
  angle: number
}

export interface PlayerData {
  x: number
  y: number
  direction : number
}

export interface UpdateMessage {
  me:PlayerData
  enemies: PlayerData[]
}
