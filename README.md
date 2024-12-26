# TicTacToe

https://samiam120.github.io/TicTacToe/

Developed an interactive and modular Tic-Tac-Toe game using JavaScript, HTML, and CSS with a focus on scalability, maintainability, and minimal global code.

Gameboard Logic: Encapsulated the gameboard in an object to represent a 3x3 grid with methods for placing markers, retrieving the board state, and displaying the game state.

Player Management: Designed a factory function to manage player details, such as names and markers (X or O).
	Game Controller: Implemented a module to manage the flow of the game, including:
 	  Switching turns between players.
	  Validating winning conditions for rows, columns, and diagonals.
	  Detecting tie scenarios.
   
User Interface: Built a responsive UI to render the gameboard dynamically and enable user interactions:
	Real-time updates to the gameboard as players make moves.
	Displaying active player turns, winner announcements, and tie notifications.
	Added event-driven functionality for capturing moves and rendering results.
 
Modular Architecture: Utilized Factory and Module patterns to ensure clean separation of concerns between game logic and UI, improving maintainability and extensibility.
