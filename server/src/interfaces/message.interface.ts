import { PlayerData } from './player.interface'
export interface InputMessage {
  move: boolean
  angle: number
}
export interface UpdateMessage {
  me: PlayerData
  enemies: PlayerData[]
}
