//board logic / adding x's and o's
const gameBoard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];

  //2d array representing the state of gameboard
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(" ");
    }
  }

  //getBoard()
  const getBoard = () => board;

  //place down marker on available spot
  const placeMarker = (row, col, player) => {
    if(board[row][col] == " "){
        //place marker here and update board
        board[row][col] = player.getMarker();
    }else{
        alert("invalid move");
    }
  };
  //updateCell()

  //printing out our current board to UI
  const printBoard = () => console.log(board);

  return { getBoard, placeMarker, printBoard };
})();

function createPlayer(name, token){
    let playerName = name;
    let marker = token;

    const getName = () => playerName;
    const getMarker = () => marker;

    return {getName, getMarker};
}


//cell object --> individual cell and value

function createCell(player, token){
    let val = token;

    const getValue = () => val;

    return{getValue};
}

//consists of a player
//marker

//retrieve cell value

//game controller object
//gameboard
//players
//current player active
// tie
// win

//controlling rthe flow and state of game
