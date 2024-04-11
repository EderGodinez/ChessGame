export class Piece{
    content;
CalculateMove(){}
previewMovement(board,piece){}
move(origen,destino){
    console.log("Se movio una pieza")
}
constructor(content){
    this.content=content
}
}
export class Queen extends Piece{
    constructor(content){
        super(content)
    }
    CalculateMove(){}
previewMovement(){}
move(){
    console.log("Se movio la reina")
}
}
export class King extends Piece{
    constructor(content){
        super(content)
    }
    CalculateMove(){}
previewMovement(){}
    move(){
    console.log("Se movio el rey")
    }

}
export class Horse extends Piece{
    constructor(content){
        super(content)
    }
    CalculateMove(){}
previewMovement(){}
    move(){
    console.log("Se movio el caballo")

    }

}
export class Rook  extends Piece{
    constructor(content){
        super(content)
    }
    CalculateMove(){}
previewMovement(){}
    move(){
    console.log("Se movio la torre")

    }

}
export class Bishop extends Piece{
    constructor(content){
        super(content)
    }
    CalculateMove(){}
previewMovement(){}
    move(){
    console.log("Se movio el padre")

    }

}
export class Pawn extends Piece{
    constructor(content){
        super(content)
    }
    N_Movement=0
    CalculateMove(){}
previewMovement(){}
    move(){
    console.log("Se movio un peon")

    }

}