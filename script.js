let SizeOfBoard = 8;
let NumberOfQueens = 0;
const img = document.createElement("img");
img.src = "./queen.jpg";
const rowOccuied = Array(8).fill(0);
const colOccuied = Array(8).fill(0);
let QueenPositions = [];


// For an 8x8 board like a chessboard
const boardHead = document.querySelector("#boardSize");
const boardStatsQueenNumbers = document.querySelector("#queensLeft")
function clearChessboard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.remove();
  });
}
function mapQueenPositions(){
  QueenPositions = []
  for (let index = 0; index < SizeOfBoard; index++) {
    let tmpArray = []
    for (let index = 0; index < SizeOfBoard; index++) {
      tmpArray.push(0)
    }
    QueenPositions.push(tmpArray);
  }
  console.log(QueenPositions)
}

function createBoard() {
  const n = SizeOfBoard;
  NumberOfQueens = 0;
  boardStatsQueenNumbers.innerHTML = n;
  boardHead.innerHTML = n + " x " + n;
  const board = document.getElementById("chessboard");
  mapQueenPositions()

  board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${n}, 1fr)`;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if ((i + j) % 2 === 0) {
        cell.classList.add("light");
      } else {
        cell.classList.add("dark");
      }
      // You can add content to each cell if needed
      // cell.textContent = `${i}-${j}`;
      cell.addEventListener("click", () => {
        if(cell.firstChild){
          removeQueen(i, j);
          NumberOfQueens--;
          
        }else if(!cell.classList.contains("red")){
          if(NumberOfQueens<SizeOfBoard){
            // cell.innerHTML = i-j;
            placeQueen(i, j);
            NumberOfQueens++;
            
          }else{
            console.log("Max Queens Are placed")
          }
        }
        boardStatsQueenNumbers.innerHTML = n-NumberOfQueens;
      });
      board.appendChild(cell);
    }
  }
 
  board.style.width = 50 * n + "px";
}
function clearBoard(){
  clearChessboard();
  createBoard();
  mapQueenPositions();
  for (let index = 0; index < SizeOfBoard; index++) {
    rowOccuied[index] = 0;
    colOccuied[index] = 0;
  }
}

// You can change the value of 'n' to create boards of different sizes
createBoard(SizeOfBoard);

function updateSize() {
  clearChessboard();
  SizeOfBoard = document.getElementById("userInput").value;
  createBoard();
}

function placeQueen(x = 0, y = 0) {
  const boardCells = document.getElementById("chessboard").childNodes;

  boardCells[x * SizeOfBoard + y].appendChild(img.cloneNode());
  // entire row will unsafe
  rowOccuied[x] =1
  colOccuied[y] =1
  QueenPositions[x][y] = 1


  for (let index = 0; index < SizeOfBoard; index++) {
    boardCells[index * SizeOfBoard + y].classList.add("red");
  }
  // entire col will unsafe
  for (let index = 0; index < SizeOfBoard; index++) {
    boardCells[x * SizeOfBoard + index].classList.add("red");
  }

  // diagonal lt-rb
  let tmpRow = x;
  let tmpCol = y;
  while (tmpRow < SizeOfBoard && tmpCol < SizeOfBoard) {
    boardCells[tmpRow * SizeOfBoard + tmpCol].classList.add("red");
    tmpCol++;
    tmpRow++;
  }
  // diagonal lt-lb
  tmpRow = x;
  tmpCol = y;
  while (tmpRow > -1 && tmpCol > -1) {
    boardCells[tmpRow * SizeOfBoard + tmpCol].classList.add("red");
    tmpCol--;
    tmpRow--;
  }

    // diagonal rt-lb
    tmpRow = x;
    tmpCol = y;
    while (tmpRow > -1 && tmpCol < SizeOfBoard) {
      boardCells[tmpRow * SizeOfBoard + tmpCol].classList.add("red");
      tmpCol++;
      tmpRow--;
    }
    // diagonal rt-lb
    tmpRow = x;
    tmpCol = y;
    while (tmpRow < SizeOfBoard && tmpCol > -1) {
      boardCells[tmpRow * SizeOfBoard + tmpCol].classList.add("red");
      tmpCol--;
      tmpRow++;
    }
}

function removeQueen(x = 0, y = 0) {
  const boardCells = document.getElementById("chessboard").childNodes;
  rowOccuied[x] = 0;
  colOccuied[y] = 0;
  QueenPositions[x][y] = 0;
  console.log(rowOccuied,colOccuied)
  console.log(QueenPositions)

  boardCells[x * SizeOfBoard + y].removeChild(boardCells[x * SizeOfBoard + y].firstChild);
  boardCells[x * SizeOfBoard + y].classList.remove("red");
  
  // entire rowwise will unsafe ?
  for (let index = 0; index < SizeOfBoard; index++) {
    if(!rowOccuied[index] && !isQueenDiagonally(index,y))
    boardCells[index * SizeOfBoard + y].classList.remove("red");
  }
  // entire colwise will unsafe
  for (let index = 0; index < SizeOfBoard; index++) {
    
    console.log(index,y,isQueenDiagonally(x,index))

    if(!colOccuied[index] && !isQueenDiagonally(x,index))
    boardCells[x * SizeOfBoard + index].classList.remove("red");
  }

  // diagonal to-rb
  let tmpRow = x;
  let tmpCol = y;
  while (tmpRow < SizeOfBoard && tmpCol < SizeOfBoard) {
    if(!rowOccuied[tmpRow] && !colOccuied[tmpCol]  && !isQueenDiagonally(tmpRow,tmpCol))
    boardCells[tmpRow * SizeOfBoard + tmpCol].classList.remove("red");
    tmpCol++;
    tmpRow++;
  }
  // diagonal to-tl
  tmpRow = x;
  tmpCol = y;
  while (tmpRow > -1 && tmpCol > -1) {
    if(!rowOccuied[tmpRow] && !colOccuied[tmpCol] && !isQueenDiagonally(tmpRow,tmpCol))
    boardCells[tmpRow * SizeOfBoard + tmpCol].classList.remove("red");
    tmpCol--;
    tmpRow--;
  }

  // diagonal to-rt
  tmpRow = x;
  tmpCol = y;
  while (tmpRow > -1 && tmpCol < SizeOfBoard) {
    if(!rowOccuied[tmpRow] && !colOccuied[tmpCol] && !isQueenDiagonally(tmpRow,tmpCol))
    boardCells[tmpRow * SizeOfBoard + tmpCol].classList.remove("red");
    tmpCol++;
    tmpRow--;
  }
  // diagonal to-lb
  tmpRow = x;
  tmpCol = y;
  while (tmpRow < SizeOfBoard && tmpCol > -1) {
    if(!rowOccuied[tmpRow] && !colOccuied[tmpCol] && !isQueenDiagonally(tmpRow,tmpCol))
    boardCells[tmpRow * SizeOfBoard + tmpCol].classList.remove("red");
    tmpCol--;
    tmpRow++;
  }
}

function isQueenDiagonally(x,y){
  let tmpRow = x;
  let tmpCol = y;
  // to rb
  while (tmpRow < SizeOfBoard && tmpCol < SizeOfBoard) {
    if(QueenPositions[tmpRow][tmpCol]){
      console.log(tmpRow,tmpCol,'1')
      return true
    }
    tmpCol++;
    tmpRow++;
  }
  // diagonal to-rt
  tmpRow = x;
  tmpCol = y;
  while (tmpRow > -1 && tmpCol > -1) {
    if(QueenPositions[tmpRow][tmpCol]){
      console.log(tmpRow,tmpCol,'2')
      return true
    }
    tmpCol--;
    tmpRow--;
  }

  tmpRow = x;
  tmpCol = y;
  // to-lt
  while (tmpRow > -1 && tmpCol < SizeOfBoard) {
    if(QueenPositions[tmpRow][tmpCol]){
      console.log(tmpRow,tmpCol,'3')
      return true
    }
    tmpCol++;
    tmpRow--;
  }
  // to-lb
  tmpRow = x;
  tmpCol = y;
  while (tmpRow < SizeOfBoard && tmpCol > -1) {
    if(QueenPositions[tmpRow][tmpCol]){
      console.log(tmpRow,tmpCol,'4')
      return true
    }
    tmpCol--;
    tmpRow++;
  }

  return false;
}