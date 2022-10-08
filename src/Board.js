// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;//rowIndex =0===>colIndex =
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //

    // O:boolean
    // I:1.array 2.each indice in array
    // C:
    // E:
    // test if a specific row on this board contains a conflict
    //pass rowIndex as argument==>need accumulate variable===>check each element if it is one or zero
    //===>if it is one accumalete variable++==>check accu variable ?>1 return true: false

    // Time Complexity: O(n)
    hasRowConflictAt: function (rowIndex) {
      var count = 0;
      for (var i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] === 1) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    //O:boolean
    //I:board/matrix
    //C:
    //E:

    // Time Complexity: O(n^2)
    hasAnyRowConflicts: function () {
      var rows = this.rows();

      for (var i = 0; i < rows.length; i++) {
        var hasConflict = this.hasRowConflictAt(rows[i]);
        if (hasConflict === true) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // O - Boolean
    // I - Integer arg representing column index / board matrix
    // C - NA
    // E - NA

    // Time Complexity: O(n)
    hasColConflictAt: function (colIndex) {
      // Create count var
      var count = 0;
      var rows = this.rows();

      // Loop over result of rows method call
      for (var i = 0; i < rows.length; i++) {
        // Use colIndex to check specified column for conflicts
        if (rows[i][colIndex] === 1) {
          // If 1 found, increment count
          count++;
        }
      }
      // If count is greater than one, return true
      if (count > 1) {
        return true;
      }
      // Otherwise return false
      return false;
    },

    // test if any columns on this board contain conflicts
    // O - boolean
    // I - No argument inputs / operating on board
    // C - NA
    // E - NA

    // Time Complexity: O(n^2)
    hasAnyColConflicts: function () {
      // Invoke rows method (store in var)
      var rows = this.rows();

      if (!rows[0]) {
        return false;
      }

      var length = rows[0].length;

      // Loop over rows
      for (var i = 0; i < length; i++) {
        // Check each row for column conflicts using hasColConflictAt
        if (this.hasColConflictAt(i)) {
          // If conflict found, return true
          return true;
        }
      }
      // Otherwise return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // O - boolean
    // I - integer represent first index operate the matrix board
    // C - no constrains
    // E - start the index far to the right

    // Time Complexity: O(n^2)
    hasMajorDiagonalConflictAt: function (colIndex) {
      var rows = this.rows();
      var count = 0;
      var result = null;
      var colIndex1 = 0;

      for (var i = 0; i < rows[0].length; i++) {
        if (rows[i][colIndex] === 1) {
          result = this._getFirstRowColumnIndexForMajorDiagonalOn(i, colIndex);//0   colIndex - rowIndex=result===>(rowIndex==j)===>colIndex ==>result+rowindex
          for (var j = 0; j < rows[0].length; j++) {
            if (j === 0) {
              count = 0;
            }
            colIndex1 = result + j;
            if (this._isInBounds(j, colIndex1)) {
              if (rows[j][colIndex1] === 1) {
                count++;
                if (count > 1) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    // O - Boolean
    // I - None
    // C - None
    // E - None
    // Strategy
    // Loop over matrix
    // use our has diag conflict func to check for conflict
    // if found return true otherwise false

    // Time Complexity: O(n^2)
    hasAnyMajorDiagonalConflicts: function () {
      var rows = this.rows();

      for (var i = 0; i < rows.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // Pseudocode
    // create rows variable storage this.rows
    // create count
    //create result
    //create colomn variable=
    //loop over rows
    //res == _getFirstRowColumnIndexForMinorDiagonalOn
    //loop again
    //reset count to zero
    //check inbound
    //check current index if it is one ===> count increment
    //check count >1?===> return boolean

    // Time Complexity: O(n^2)
    hasMinorDiagonalConflictAt: function (colIndex) {
      var rows = this.rows();
      var count = 0;
      var result = null;
      var colIndex1 = 0;

      for (var i = 0; i < rows[0].length; i++) {
        if (rows[i][colIndex] === 1) {
          result = this._getFirstRowColumnIndexForMinorDiagonalOn(i, colIndex);
          for (var j = 0; j < rows[0].length; j++) {
            if (j === 0) {
              count = 0;
            }
            colIndex1 = result - j;
            if (this._isInBounds(j, colIndex1)) {
              if (rows[j][colIndex1] === 1) {
                count++;
                if (count > 1) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    // Time Complexity: O(n^2)
    hasAnyMinorDiagonalConflicts: function () {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
