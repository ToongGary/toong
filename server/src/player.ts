export default class Player {
    name:string
    x:number
    y:number
    hp:number
    score:number

    constructor(name:string, x:number, y:number) {
        this.name = name
        this.x = x
        this.y = y
        this.hp = 100
        this.score = 0
    }
}
