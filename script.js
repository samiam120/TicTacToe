//board logic / adding x's and o's
function gameBoard() {
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
    if (board[row][col] == " ") {
      //place marker here and update board
      board[row][col] = player.getMarker();
      return true;
    } else {
      alert("invalid move");
      return false;
    }
  };

  //printing out our current board to UI
  const printBoard = () => console.log(board);

  return { getBoard, placeMarker, printBoard };
}

function createPlayer(name, token) {
  let playerName = name;
  let marker = token;

  const getName = () => playerName;
  const getMarker = () => marker;

  return { getName, getMarker };
}

//cell object --> individual cell and value

function createCell(player, token) {
  let val = token;

  const getValue = () => val;

  return { getValue };
}

function gameController() {
  //game controller object
  //gameboard
  const board = gameBoard();
  //players
  const playerOne = createPlayer("Player One", "X");
  const playerTwo = createPlayer("Player Two", "O");
  //current player active

  let activePlayer = playerOne;

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const printBoard = () => board.printBoard();
  const playRound = (row, col) => {
    console.log(`${activePlayer.getName()}'s turn....`);
    if (board.placeMarker(row, col, getActivePlayer())) {
      switchPlayerTurn();
      printBoard();
    } else {
      alert(`select valid move`);
    }
  };

  // tie
  // win

  //controlling rthe flow and state of game
  return { getActivePlayer, playRound };
}
