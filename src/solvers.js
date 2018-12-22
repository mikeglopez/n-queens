/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ]


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows(); // board array
  console.log(board);
  for (var row = 0; row < solution.length; row++) {
    for (var col = 0; col < solution[row].length; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solution = board.rows(); // board array
  var solutionCount = 0; //fixme

  var rowNum = 0;

  // var checkBoard = function(currBoard, rows) {
  //   if (num > 0) {
  //   // iterating through each board element
  //     for (var row = 0; row < currBoard.length; row++) {
  //       for (var col = 0; col < currBoard[row].length; col++) {
  //         // if the current element is 0 (toggled off)
  //         if (currBoard[row][col] === 0) {
  //           // toggle it on
  //           board.togglePiece(row, col);
  //           // if there are any rooks conflicts, toggle it back off
  //           if (board.hasAnyRooksConflicts()) {
  //             board.togglePiece(row, col);
  //           }
  //           // recurse with the same board -> try adding a rook to the next element on the board
  //           checkBoard(currBoard, num - 1);
  //           // recursion has returned, toggle this piece back off (if we turned it on in the first place) and try the next spot
  //           if (currBoard[row][col] === 1) {
  //             board.togglePiece(row, col);
  //           }
  //           // and increment solutionCount?
  //           solutionCount++;
  //         }
  //       }
  //     }
  //   }
  // }


  var checkBoard = function(currBoard, rows) {
    if (rows < n) {
      for (var col = 0; col < n; col++) {
        board.togglePiece(rows, col); // toggle piece on
        // check for conflict
        if (!board.hasAnyRooksConflicts()) { // if piece has no conflicts, pass array into function again
          checkBoard(solution, rows + 1);
        } else {
          board.togglePiece(rows, col); // if there is conflict, toggle piece off
        }
      }
      solutionCount++;
    }
  };

  checkBoard(solution, rowNum);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


/*

Don't reinvent wheel where you don't have to. Use the Board constructor you build out in src/Board.js in your code.
You can also access it within the Chrome console easily after opening BoardViewer.html

Create new board instances that have access to all the helper methods you write in src/Board.js
example: var board = new Board({n:5})

Rather than setting or getting object properties directly with plain JavaScript, Backbone provides the get and set methods.
Play with the getters and setters that Backbone provides
example: board.get(3) will return the 3rd row of the instance board (assuming that instance exists)
Rows run horizontally, left to right

Columns run vertically, top to bottom
Major Diagonals run diagonally, top-left to bottom-right
Minor Diagonals run diagonally, top-right to bottom-left

In chess the rook piece moves and attacks horizontally (along rows) or vertically (along columns),
through any number of unoccupied squares

In chess the queen piece moves and attacks horizontally (along rows), vertically (along columns),
or diagonally (along major and minor diagonals), through any number of unoccupied squares

*/