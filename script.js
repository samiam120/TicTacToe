//board logic / adding x's and o's
function gameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  // 2d array representing the state of gameboard
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

  const printBoard = () => {
    board.printBoard();
    console.log(`${activePlayer.getName()}'s turn....`);
  };

  const playRound = (row, col) => {
    if (board.placeMarker(row, col, getActivePlayer())) {
      if (isWin()) {
        console.log(`${getActivePlayer().getName()} wins!`);
        console.log(board.printBoard());
        return;
      } else if (isTie()) {
        console.log(`Tie!`);
        return;
      } else {
        switchPlayerTurn();
        printBoard();
      }
    }
  };
  // tie
  const isTie = () => {
    const temp = board.getBoard();
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].some((item) => item === " ")) {
        return false;
      }
    }
    return true;
  };

  // win

  const checkWin = (arr) => {
    if (arr.every((item) => item === getActivePlayer().getMarker())) {
      return true;
    }
  };
  const isWin = () => {
    //check rows
    const boardArr = board.getBoard();
    for (let i = 0; i < boardArr.length; i++) {
      let row = boardArr[i];
      if (checkWin(row)) {
        return true;
      }
    }

    //check columns
    for (let i = 0; i < boardArr.length; i++) {
      let temp = [];
      for (let j = 0; j < boardArr[0].length; j++) {
        temp.push(boardArr[j][i]);
      }
      if (checkWin(temp)) {
        return true;
      }
    }

    //check diagonal (top left to bottom right)
    let temp = [];
    for (let i = 0; i < boardArr.length; i++) {
      temp.push(boardArr[i][i]);
    }
    if (checkWin(temp)) {
      return true;
    }

    temp = [];
    for (let i = boardArr.length - 1; i >= 0; i--) {
      temp.push(boardArr[i][boardArr.length - i - 1]);
    }
    if (checkWin(temp)) {
      return true;
    }
  };

  //controlling rthe flow and state of game
  return { getActivePlayer, playRound };
}

game = gameController();
