import {Bishop,Horse,King,Pawn,Queen,Rook} from './piece.js'
export class player1{
    NumPlayer;
    Rooks;
    Bishops;
    Horse;
    Pawns;
    Queen;
    King;
    constructor(){
       
            this.Rooks=[new Rook('♖'),new Rook('♖')]
            this.Bishops=[new Bishop('♗'),new Bishop('♗')]
            this.Horse=[new Horse('♘'),new Horse('♘')]
            this.Pawns=[]
           this.Queen=new Queen('♕')
            this.King=new King('♔')
            for(let i=0;i<8;i++){
                this.Pawns.push(new Pawn('♟'))
            }
   
    }
    }
    export class player2 extends player1{
        constructor(){
            super();
            this.Rooks=[new Rook('♜'),new Rook('♜')]
            this.Bishops=[new Bishop('♝'),new Bishop('♝')]
            this.Horse=[new Horse('♞'),new Horse('♞')]
            this.Pawns=[]
            this.Queen=new Queen('♛')
            this.King=new King('♚')
            for(let i=0;i<8;i++){
                this.Pawns.push(new Pawn('♙'))
            }
        }
    }