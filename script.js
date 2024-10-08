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

  //getter for our board
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

//factory function for creating player
function createPlayer(name, token) {
  let playerName = name;
  let marker = token;

  const getName = () => playerName;
  const getMarker = () => marker;

  return { getName, getMarker };
}

function gameController() {
  const board = gameBoard();

  const playerOne = createPlayer("Player One", "X");
  const playerTwo = createPlayer("Player Two", "O");

  let activePlayer = playerOne;

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const printBoard = () => {
    board.printBoard();
    console.log(`${activePlayer.getMarker()}'s turn....`);
  };

  const playRound = (row, col) => {
    if (board.placeMarker(row, col, getActivePlayer())) {
      if (isWin()) {
        console.log(`${getActivePlayer().getMarker()} wins!`);
        console.log(board.printBoard());
        return "win";
      } else if (isTie()) {
        return "tie";
      } else {
        switchPlayerTurn();
        printBoard();
      }
    }
  };
  // tie logic
  const isTie = () => {
    const temp = board.getBoard();
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].some((item) => item === " ")) {
        return false;
      }
    }
    console.log("its a tie");
    return true;
  };

  // helper function
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
  return { getActivePlayer, playRound, getBoard: board.getBoard };
}

function ScreenController() {
  const game = gameController();
  const playerTurnDiv = document.querySelector(".playerTurn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.getMarker()}'s turn`;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        const cellBtn = document.createElement("button");
        cellBtn.classList.add("cell");
        cellBtn.dataset.row = i;
        cellBtn.dataset.col = j;
        cellBtn.textContent = board[i][j];
        boardDiv.appendChild(cellBtn);
      }
    }
  };

  function clickHandlerBoard(e) {
    const r = e.target.dataset.row;
    const c = e.target.dataset.col;

    const res = game.playRound(r, c);
    if (res === "win") {
      updateScreen();
      playerTurnDiv.textContent = `${game.getActivePlayer().getMarker()} won!`;
      boardDiv.removeEventListener("click", clickHandlerBoard);
      return;
    } else if (res === "tie") {
      updateScreen();
      playerTurnDiv.textContent = `Its a tie`;
      boardDiv.removeEventListener("click", clickHandlerBoard);
      return;
    } else {
      updateScreen();
    }
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
}
ScreenController();
