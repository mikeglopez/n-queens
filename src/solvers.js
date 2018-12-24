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
  var solutionCount = 0;

  var checkBoards = function(rowNum) {
    if (rowNum === n) {
      solutionCount++;
      return;
    }
    for (var colNum = 0; colNum < n; colNum++) {
      board.togglePiece(rowNum, colNum);
      if (!board.hasAnyRooksConflicts()) {
        checkBoards(rowNum + 1);
      }
      board.togglePiece(rowNum, colNum);
    }
  };

  checkBoards(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows(); // board array

  var checkBoards = function(rowNum, n, board, cb) {
    if (rowNum === n) {
      cb();
      return;
    }
    for (var colNum = 0; colNum < n; colNum++) {
      board.togglePiece(rowNum, colNum);
      if (!board.hasAnyQueensConflicts()) {
        checkBoards(rowNum + 1, n, board, cb);
      }
      board.togglePiece(rowNum, colNum);
    }
  };

  checkBoards(0, n, board, function() {
    solution = _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution || board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var checkBoard = function(rows) {
    if (rows === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(rows, col);
      if (!board.hasAnyQueensConflicts()) {
        checkBoard(rows + 1);
      }
      board.togglePiece(rows, col);
    }
  };

  checkBoard(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};