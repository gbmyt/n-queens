/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// I - Integer representing board size
// O - Array of Arrays (solution board)
// C - Pieces must be placed in such a way that they are not vulnerable to attack from any other rooks/queens
// E - Row index is out of bounds (handled in helper function ?)

// ➡ variables
// n (board size)
// solutionBoard
// solutionCount
// start index (?) - do we always have to start at the first space of board?

// ➡ Pseudo
// Given an empty board
// If no more rows to check, return solution board
// If more rows, get next row
// For each space of row
// If this space has no conflicts,
//   Return success and add piece* to solution board
// If this space has conflict
//   Return false and backtrack to the last spot (move on to next spot?)
// Recursively check next space

// Return solutionBoard

// var board = new Board({n:5})
// board.get(3) will return the 3rd row of the instance board (assuming that instance exists)
// board.set()
window.findNRooksSolution = function (n) {
  var solution = new Board({ n: n });
  var board = solution.rows();
  var col = {};

  var bt = function (rowIndex, board) {
    if (rowIndex === n) {
      return;
    }

    for (var colIndex = 0; colIndex < n; colIndex++) {
      if (!col[colIndex]) {
        board[rowIndex][colIndex] = 1;
        col[colIndex] = true;
        bt(rowIndex + 1, board);
        // col[colIndex] = false;
        // board[rowIndex][colIndex] = 0;
      }
    }
  };
  bt(0, board);

  console.log('-> Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// I - Integer representing board size
// O - Int representing number of solutions
// C -
// E -

window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  var solution = new Board({ n: n });
  var board = solution.rows();
  var col = {};

  console.log('Before', board);
  var bt = function (rowIndex, board) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    for (var colIndex = 0; colIndex < n; colIndex++) {
      if (!col[colIndex]) {
        board[rowIndex][colIndex] = 1;
        col[colIndex] = true;
        bt(rowIndex + 1, board);
        col[colIndex] = false;
        board[rowIndex][colIndex] = 0;
      }
    }
  };
  bt(0, board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};