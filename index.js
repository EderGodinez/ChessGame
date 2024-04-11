import {player1,player2} from '../player.js'
let seconds = 0;
let minutes = 0;
let timerInterval;
let isVisibleButton = true;
let turno=1;
let PieceSelected;

const playerOne=new player1();
    const playerTwo=new player2();
    const playerOnePieces = [
        ...playerOne.Rooks.map(rook => rook.content),
        ...playerOne.Bishops.map(bishop => bishop.content),
        ...playerOne.Horse.map(horse => horse.content),
        playerOne.Queen.content,
        playerOne.King.content,
        ...playerOne.Pawns.map(pawn => pawn.content)
    ];
    
    const playerTwoPieces = [
        ...playerTwo.Rooks.map(rook => rook.content),
        ...playerTwo.Bishops.map(bishop => bishop.content),
        ...playerTwo.Horse.map(horse => horse.content),
        playerTwo.Queen.content,
        playerTwo.King.content,
        ...playerTwo.Pawns.map(pawn => pawn.content)
    ];
    const chessBoard = {
        "a1": { Piece: playerOne.Rooks[0] },
        "b1": { Piece: playerOne.Pawns[0] },
        "c1": {Piece:""},
        "d1": {Piece:""},
        "e1": {Piece:""},
        "f1": {Piece:""},
        "g1": { Piece: playerTwo.Pawns[0] },
        "h1": { Piece: playerTwo.Rooks[0] },
        "a2": { Piece: playerOne.Horse[0] },
        "b2": { Piece: playerOne.Pawns[1] },
        "c2": {Piece:""},
        "d2": {Piece:""},
        "e2": {Piece:""},
        "f2": {Piece:""},
        "g2": { Piece: playerTwo.Pawns[1] },
        "h2": { Piece: playerTwo.Horse[0] },
        "a3": { Piece: playerOne.Bishops[0] },
        "b3": { Piece: playerOne.Pawns[2] },
        "c3": {Piece:""},
        "d3": {Piece:""},
        "e3": {Piece:""},
        "f3": {Piece:""},
        "g3": { Piece: playerTwo.Pawns[2] },
        "h3": { Piece: playerTwo.Bishops[0] },
        "a4": { Piece: playerOne.Queen },
        "b4": { Piece: playerOne.Pawns[3] },
        "c4": {Piece:""},
        "d4": {Piece:""},
        "e4": {Piece:""},
        "f4": {Piece:""},
        "g4": { Piece: playerTwo.Pawns[3] },
        "h4": { Piece: playerTwo.Queen },
        "a5": { Piece: playerOne.King },
        "b5": { Piece: playerOne.Pawns[4] },
        "c5": {Piece:""},
        "d5": {Piece:""},
        "e5": {Piece:""},
        "f5": {Piece:""},
        "g5": { Piece: playerTwo.Pawns[4] },
        "h5": { Piece: playerTwo.King },
        "a6": { Piece: playerOne.Bishops[1] },
        "b6": { Piece: playerOne.Pawns[5] },
        "c6": {Piece:""},
        "d6": {Piece:""},
        "e6": {Piece:""},
        "f6": {Piece:""},
        "g6": { Piece: playerTwo.Pawns[5] },
        "h6": { Piece: playerTwo.Bishops[1] },
        "a7": { Piece: playerOne.Horse[1] },
        "b7": { Piece: playerOne.Pawns[6] },
        "c7": {Piece:""},
        "d7": {Piece:""},
        "e7": {Piece:""},
        "f7": {Piece:""},
        "g7": { Piece: playerTwo.Pawns[6] },
        "h7": { Piece: playerTwo.Horse[1] },
        "a8": { Piece: playerOne.Rooks[1] },
        "b8": { Piece: playerOne.Pawns[7] },
        "c8": {Piece:""},
        "d8": {Piece:""},
        "e8": {Piece:""},
        "f8": {Piece:""},
        "g8": { Piece: playerTwo.Pawns[7] },
        "h8": { Piece: playerTwo.Rooks[1] },
    };
    
const timerElement = document.getElementById('timer');
const BtnStart=document.querySelector("#start")
const BtnReset=document.querySelector("#reset")
const StartTimer=document.querySelector("#bigginner-timer")
const boxes=document.querySelectorAll(".box")
const turnoJugador=document.querySelector("#turno")

const identificadores = generarIdentificadores();
        boxes.forEach((casilla, index) => {
            casilla.classList.add('relative')
            casilla.id = identificadores[index];
        });
ResetBoard()
BtnReset.addEventListener("click",()=>{
    if(timerElement.textContent !== "00:00"){
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas reiniciar la partida? ,Se eliminara todo avance de esta partida',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí,terminar',
        cancelButtonText: 'No, continuar'
    }).then((result) => {
        if (result.isConfirmed) {
            clearInterval(timerInterval);
            seconds = 0;
            minutes = 0;
            timerElement.textContent = "00:00";
            Swal.fire('Juego finalizado!', '', 'success');
            toggleButtonVisibility()
            ResetBoard()
        }
    });
}
})
BtnStart.addEventListener("click",()=>{
    toggleButtonVisibility()
    let interval;
    let counter=3;
    StartTimer.classList.remove('hidden')
    const audio=new Audio("./assets/mp3/countdown.mp3")
    audio.play()
    StartTimer.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], {
        duration: 1000, 
        easing: 'ease-in-out' 
      });
      setTimeout(() => {
        interval = setInterval(() => {
            if (counter <= 0) {
                StartTimer.textContent = "Inicien :D!!";
                clearInterval(interval); 
            } else {
                StartTimer.textContent = counter.toString();
                counter--;
            }
        }, 1000);
    }, 0);
        setTimeout(() => {
            StartTimer.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 3000,
                easing: 'ease-in-out'
            });
            setTimeout(() => {
    StartTimer.classList.add('hidden')
            }, 1000);
        }, 4000);
   
      setTimeout(()=>{
        turno=1
        turnoJugador.textContent="Turno de Jugador " + turno
        turnoJugador.classList.add("text-black")
        ///SE Inicializan los listener para seleccionar casillas a mover dependiendo del turno
        boxes.forEach((box,index) => {
            box.addEventListener("click", () => {
                const spanElement = box.querySelector('span');
                const classListArray = Array.from(box.classList);
                const classTurno=turno===1?"text-black":"text-orange-700";
                if (spanElement.textContent!==""&&classListArray.includes(classTurno)) {
                    PieceSelected=index
                    ShowMoves(chessBoard[box.id].Piece,index,`player${turno}`,classListArray,classTurno)
                }
            });
        });
        timerInterval = setInterval(()=>{
            updateTimer()
        },1000)
      },3000)
})
        function updateTimer() {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerElement.textContent = formattedTime;
        }
        function toggleButtonVisibility() {
            if (isVisibleButton) {
                BtnStart.classList.add('hidden') 
                isVisibleButton=false
            } else {
                BtnStart.classList.remove('hidden')
                isVisibleButton=true
            }
        }
        function generarIdentificadores() {
            const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            const numeros = ['1', '2', '3', '4', '5', '6', '7', '8'];
            const identificadores = [];
            for (let letra of letras) {
                for (let numero of numeros) {
                    identificadores.push(letra + numero);
                }
            }
            return identificadores;
        }
function ResetBoard(){
    const playerOne=new player1();
    const playerTwo=new player2();
    const chessBoard = {
        "a1": { Piece: playerOne.Rooks[0] },
        "b1": { Piece: playerOne.Pawns[0] },
        "c1": {Piece:""},
        "d1": {Piece:""},
        "e1": {Piece:""},
        "f1": {Piece:""},
        "g1": { Piece: playerTwo.Pawns[0] },
        "h1": { Piece: playerTwo.Rooks[0] },
        "a2": { Piece: playerOne.Horse[0] },
        "b2": { Piece: playerOne.Pawns[1] },
        "c2": {Piece:""},
        "d2": {Piece:""},
        "e2": {Piece:""},
        "f2": {Piece:""},
        "g2": { Piece: playerTwo.Pawns[1] },
        "h2": { Piece: playerTwo.Horse[0] },
        "a3": { Piece: playerOne.Bishops[0] },
        "b3": { Piece: playerOne.Pawns[2] },
        "c3": {Piece:""},
        "d3": {Piece:""},
        "e3": {Piece:""},
        "f3": {Piece:""},
        "g3": { Piece: playerTwo.Pawns[2] },
        "h3": { Piece: playerTwo.Bishops[0] },
        "a4": { Piece: playerOne.Queen },
        "b4": { Piece: playerOne.Pawns[3] },
        "c4": {Piece:""},
        "d4": {Piece:""},
        "e4": {Piece:""},
        "f4": {Piece:""},
        "g4": { Piece: playerTwo.Pawns[3] },
        "h4": { Piece: playerTwo.Queen },
        "a5": { Piece: playerOne.King },
        "b5": { Piece: playerOne.Pawns[4] },
        "c5": {Piece:""},
        "d5": {Piece:""},
        "e5": {Piece:""},
        "f5": {Piece:""},
        "g5": { Piece: playerTwo.Pawns[4] },
        "h5": { Piece: playerTwo.King },
        "a6": { Piece: playerOne.Bishops[1] },
        "b6": { Piece: playerOne.Pawns[5] },
        "c6": {Piece:""},
        "d6": {Piece:""},
        "e6": {Piece:""},
        "f6": {Piece:""},
        "g6": { Piece: playerTwo.Pawns[5] },
        "h6": { Piece: playerTwo.Bishops[1] },
        "a7": { Piece: playerOne.Horse[1] },
        "b7": { Piece: playerOne.Pawns[6] },
        "c7": {Piece:""},
        "d7": {Piece:""},
        "e7": {Piece:""},
        "f7": {Piece:""},
        "g7": { Piece: playerTwo.Pawns[6] },
        "h7": { Piece: playerTwo.Horse[1] },
        "a8": { Piece: playerOne.Rooks[1] },
        "b8": { Piece: playerOne.Pawns[7] },
        "c8": {Piece:""},
        "d8": {Piece:""},
        "e8": {Piece:""},
        "f8": {Piece:""},
        "g8": { Piece: playerTwo.Pawns[7] },
        "h8": { Piece: playerTwo.Rooks[1] },
    };
const keys =Object.keys(chessBoard)
keys.forEach(key=>{
    const cell=document.getElementById(key)
    cell.innerHTML = '';
    const content = chessBoard[key].Piece.content;
    const spanElement = document.createElement('span');
    spanElement.textContent = content;
    cell.appendChild(spanElement);
cell.classList.add("border");
if (playerOnePieces.includes(content)) {
    cell.classList.add("text-black");
} else if (playerTwoPieces.includes(content)) {
    cell.classList.add("text-orange-700");
}
})    
}
function ShowMoves(Piece,indexO,player,classList,classTurno){
    //LiMPIAR TODOS LOS CIRCULOS MOSTRADOS
    CleanCircles();
    const moves = CalculateMoves(Piece, indexO,player,classTurno);
    moves.forEach(move => {
        const cell = boxes[move]
        if (cell) {
            const divExist=cell.querySelector('div')?true:false
           if (!divExist) {
            const circle = document.createElement('div');
            const span=cell.querySelector('span')
            if(span.textContent!==""){
            circle.classList="w-12 h-12 border border-orange-700 rounded-full absolute"
            }
            else{
            circle.classList="w-12 h-12 border border-blue-500 rounded-full"
            }
            cell.appendChild(circle);
            let ThereWinner=false
            circle.addEventListener("click",()=>{
                //Se realiza movimiento de ficha
                boxes[move].classList.remove("text-black", "text-orange-700");
                const New=boxes[move].querySelector('span')
                boxes[move].classList.add(classTurno)
                const span=boxes[PieceSelected].querySelector('span')
                New.textContent=span.textContent
                span.textContent=''
                if (chessBoard[cell.id].Piece.constructor.name==='King') {
                    ThereWinner=true
                    boxes.forEach((box,index) => {
                        box.removeEventListener("click", () => {
                            const spanElement = box.querySelector('span');
                            const classListArray = Array.from(box.classList);
                            const classTurno=turno===1?"text-black":"text-orange-700";
                            if (spanElement.textContent!==""&&classListArray.includes(classTurno)) {
                                PieceSelected=index
                                ShowMoves(chessBoard[box.id].Piece,index,`player${turno}`,classListArray,classTurno)
                            }
                        });
                    });
                    const Winner=boxes[move].classList.contains('text-black')?"Jugador 1 gana":"Jugador 2 gana"
                    const audio=new Audio("./assets/mp3/tada.mp3")
                    audio.play()
                    turnoJugador.classList.remove("text-black")
                    turnoJugador.classList.add("text-green-500")
                    turnoJugador.textContent=Winner
                    setTimeout(() => {
                    ResetBoard() 
            toggleButtonVisibility()
            turnoJugador.classList.add("text-black")
            turnoJugador.textContent=""

                    }, 5000);
                }
                chessBoard[cell.id]=chessBoard[boxes[PieceSelected].id]
                setTimeout(() => {
                CleanCircles();
                }, 1);
                chessBoard[boxes[PieceSelected].id]={Piece:""}
                if (!ThereWinner) {
                    //Se cambia de turno de jugador
                if(classList.includes(classTurno)){
                    if (turno===2) {
                        turno=1
                        turnoJugador.textContent="Turno de Jugador " + turno
                    } else {
                        turno=2
                        turnoJugador.textContent="Turno de Jugador " + turno
                    }
                }
                }
            })
           }
        }
    });
    
}


function CalculateMoves(piece, index,player,classTurno) {
    switch(piece.constructor.name){
        case "Queen":
            const diagonal=calculateDiagonal(index,classTurno)
            const lateral=calculateLateral(index,classTurno)
            const frontal=calculateFrontal(index,classTurno)
            return [...diagonal,...lateral,...frontal];

            break;
        case "King":
            const row = Math.floor(index / 8);
            const col = index % 8;
            const moves = [];
        
            // Direcciones posibles de movimiento del rey
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],[0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
        
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
               
                if (isValidSquare(newRow, newCol)) {
                    const targetSquare = boxes[newRow * 8 + newCol];
                    const targetPiece = targetSquare.querySelector('span').textContent;
                    if (targetPiece === "" || !targetSquare.classList.contains(classTurno)) {
                        moves.push(newRow * 8 + newCol);
                    }
                }
            }
            return moves;
            break;
        case "Horse":
                const knightMoves = [];
                const knightDeltas = [
                    { row: -2, col: -1 }, { row: -2, col: 1 },
                    { row: -1, col: -2 }, { row: -1, col: 2 },
                    { row: 1, col: -2 }, { row: 1, col: 2 },
                    { row: 2, col: -1 }, { row: 2, col: 1 }
                ];
                knightDeltas.forEach(delta => {
                    const newRow = Math.floor(index / 8) + delta.row;
                    const newCol = index % 8 + delta.col;
                    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                        const newIndex = newRow * 8 + newCol;
                         if (boxes[newIndex].querySelector('span').textContent === ""||!boxes[newIndex].classList.contains(classTurno)) {
                            knightMoves.push(newIndex);
                         }
                    }
                });
                return knightMoves;
            break;
        case "Rook":
            const front=calculateFrontal(index,classTurno)
           const late=calculateLateral(index,classTurno)
           
            return [...front,...late];

            break;
        case "Bishop":
            const diag=calculateDiagonal(index,classTurno)
            return diag;

            break;
        case "Pawn":
            const ORILLAIZQ=[0,8,16,24,32,40,48,56]
            const ORILLADER=[7,15,23,31,39,47,55,63]
            const list=[]
            if (player==="player1") {
                if (piece.N_Movement===0) {
                for (let i = 1; i <= 2; i++) {
                    //VALIDAR QUE ESTA VACIA UNA CASILLA DE ENFRENTE
                    if(boxes[index+(8*i)].querySelector('span').textContent===""){
                        list.push(index+(8*i));
                    }
                   
                }
                if (!boxes[index+7].classList.contains(classTurno)&&boxes[index+7].querySelector('span').textContent!=="") {
                    list.push((index+7))
                    }
                    if (!boxes[index+9].classList.contains(classTurno)&&boxes[index+9].querySelector('span').textContent!=="") {
                    list.push((index+9))
                    }
                piece.N_Movement++
                return list
                }
                const lista=[]
                //caso de orilla izq
                if (ORILLAIZQ.includes(index)) {
                    if (!boxes[index+9].classList.contains(classTurno)&&boxes[index+9].querySelector('span').textContent!=="") {
                    lista.push((index+9))
                    }
                }
                //caso de orilla der
                if (ORILLADER.includes(index)) {
                    if (!boxes[index+7].classList.contains(classTurno)&&boxes[index+7].querySelector('span').textContent!=="") {
                   lista.push((index+7))
                    }
                }
                // demas casos
                else{
                    if (!boxes[index+7].classList.contains(classTurno)&&boxes[index+7].querySelector('span').textContent!=="") {
                    lista.push((index+7))
                    }
                    if (!boxes[index+9].classList.contains(classTurno)&&boxes[index+9].querySelector('span').textContent!=="") {
                    lista.push((index+9))
                    }
                }
                if(boxes[index+(8)].querySelector('span').textContent===""){
                lista.push(index+(8))  
                }
                return lista;
            } else {
                if (piece.N_Movement===0) {
                for (let i = 1; i <= 2; i++) {
                    if(boxes[index-(8*i)].querySelector('span').textContent===""){
                        list.push(index-(8*i));
                    }
                    
                }
                if (!boxes[index-7].classList.contains(classTurno)&&boxes[index-7].querySelector('span').textContent!=="") {
                    list.push((index-7))
                    }
                    if (!boxes[index-9].classList.contains(classTurno)&&boxes[index-9].querySelector('span').textContent!=="") {
                    list.push((index-9))
                    }
                piece.N_Movement++
                return list
                }
                const lista=[]
                //caso de orilla izq
                if (ORILLAIZQ.includes(index)) {
                    if (!boxes[index-7].classList.contains(classTurno)&&boxes[index-7].querySelector('span').textContent!=="") {
                    lista.push((index-7))
                    }
                }
                //caso de orilla der
                if (ORILLADER.includes(index)) {
                    if (!boxes[index-9].classList.contains(classTurno)&&boxes[index-9].querySelector('span').textContent!=="") {
                   lista.push((index-9))
                    }
                }
                // demas casos
                else{
                    if (!boxes[index-7].classList.contains(classTurno)&&boxes[index-7].querySelector('span').textContent!=="") {
                    lista.push((index-7))
                    }
                    if (!boxes[index-9].classList.contains(classTurno)&&boxes[index-9].querySelector('span').textContent!=="") {
                    lista.push((index-9))
                    }
                }
                if(boxes[index-(8)].querySelector('span').textContent===""){
                lista.push((index-(8)))    
                }
                return lista;
            }
            break;
    }
}
function CleanCircles(){
    const divsToRemove = document.querySelectorAll('.w-12.h-12.border.border-blue-500.rounded-full');
divsToRemove.forEach(div => {
    div.remove();
});
const divsToDelete = document.querySelectorAll('.w-12.h-12.border.border-orange-700.rounded-full.absolute');
divsToDelete.forEach(div => {
    div.remove();
});
}
function  calculateDiagonal(index,classTurno){
    const ORILLAIZQ=[0,8,16,24,32,40,48,56]
    const ORILLADER=[7,15,23,31,39,47,55,63]
    const moves = [];
    // Offset para los movimientos diagonales
    const diagonalOffsets = [-9, -7, 7, 9];

    for (const offset of diagonalOffsets) {
        let newIndex=index+offset
        while (newIndex>=0&&newIndex<=63) {
            const targetSquare = boxes[newIndex];
            const targetPiece = targetSquare.querySelector('span').textContent;
            
            if (targetPiece === "") {
                if ((ORILLADER.includes(index)&&ORILLAIZQ.includes(newIndex))||(ORILLAIZQ.includes(index)&&ORILLADER.includes(newIndex))) {
                    break;
                }
                moves.push(newIndex);
            } else {
                // Si hay una pieza en el camino, se puede capturar pero no mover más allá
                if (!targetSquare.classList.contains(classTurno)) {
                    moves.push(newIndex);
                }
                break; // Se detiene la búsqueda en esa dirección
            }
            //se DETIENE LA BUSQUEDA EN EL MOMENTO DE QUE ESTE EN LA ORILLA
            if (ORILLADER.includes(newIndex)||ORILLAIZQ.includes(newIndex)) {
                break;
        }
            newIndex+=offset
        }
    }

    return moves;
}
function  calculateLateral(index,classTurno){
    const row = Math.floor(index / 8);
    const col = index % 8;
    const moves = [];

    // Direcciones posibles de movimiento vertical (arriba y abajo)
    const directions = [
        [-1, 0], // Arriba
        [1, 0]   // Abajo
    ];

    for (const [dr, dc] of directions) {
        let newRow = row + dr;
        let newCol = col + dc;
        while (isValidSquare(newRow, newCol)) {
            const targetSquare = boxes[newRow *8+newCol];
            if (targetSquare.querySelector('span').textContent === "") {
                moves.push(newRow *8+newCol);
            } else {
                if (targetSquare.classList.contains(classTurno)) {
                break; // Se detiene la búsqueda en esa dirección
                }
                // Si hay una pieza en el camino, se puede capturar pero no mover más allá
                if (!targetSquare.classList.contains(classTurno)) {
                    moves.push(newRow *8+newCol);
                break; // Se detiene la búsqueda en esa dirección
                }
            }
            newRow += dr;
            newCol += dc;
        }
    }
    return moves;
}
function  calculateFrontal(index,classTurno){
    const row = Math.floor(index / 8);
    const col = index % 8;
    const moves = [];

    const directions = [
        [0, -1], // Izquierda
        [0, 1]   // Derecha
    ];
    for (const [dr, dc] of directions) {
        let newRow = row + dr;
        let newCol = col + dc;
        while (isValidSquare(newRow, newCol)) {
            const targetSquare = boxes[newRow *8+newCol];
            if (targetSquare.querySelector('span').textContent === "") {
                moves.push(newRow *8+newCol);
            } else {
                if (targetSquare.classList.contains(classTurno)) {
                break; // Se detiene la búsqueda en esa dirección
                }
                // Si hay una pieza en el camino, se puede capturar pero no mover más allá
                if (!targetSquare.classList.contains(classTurno)) {
                    moves.push(newRow *8+newCol);
                break; // Se detiene la búsqueda en esa dirección
                }
            }
            newRow += dr;
            newCol += dc;
        }
    }

    return moves;
}

function isValidSquare(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}