describe('Board', function () {

  describe('Empty board', function () {
    var matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var emptyBoard = new Board(matrix);

    it('should not find a row conflict', function () {
      expect(emptyBoard.hasAnyRowConflicts()).to.be.equal(false);
    });

    it('should not find a col conflict', function () {
      expect(emptyBoard.hasAnyColConflicts()).to.be.equal(false);
    });

    it('should not find a rooks conflict', function () {
      expect(emptyBoard.hasAnyRooksConflicts()).to.be.equal(false);
    });

    it('should not find a majorDiagonal conflict', function () {
      expect(emptyBoard.hasAnyMajorDiagonalConflicts()).to.be.equal(false);
    });

    it('should not find a minorDiagonal conflict', function () {
      expect(emptyBoard.hasAnyMinorDiagonalConflicts()).to.be.equal(false);
    });

    it('should not find a queens conflict', function () {
      expect(emptyBoard.hasAnyQueensConflicts()).to.be.equal(false);
    });
  });

  describe('Board with row conflicts', function () {
    var matrix = [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var conflictBoard = new Board(matrix);
    it('whether the row has conflict', function () {
      expect(conflictBoard.hasRowConflictAt(matrix[1])).to.be.equal(true);
    });
    it('should find a row conflict', function () {
      expect(conflictBoard.hasAnyRowConflicts()).to.be.equal(true);
    });

    it('should not find a col conflict', function () {
      expect(conflictBoard.hasAnyColConflicts()).to.be.equal(false);
    });

    it('should find a rooks conflict', function () {
      expect(conflictBoard.hasAnyRooksConflicts()).to.be.equal(true);
    });

    it('should not find a majorDiagonal conflict', function () {
      expect(conflictBoard.hasAnyMajorDiagonalConflicts()).to.be.equal(false);
    });

    it('should not find a minorDiagonal conflict', function () {
      expect(conflictBoard.hasAnyMinorDiagonalConflicts()).to.be.equal(false);
    });

    it('should find a queens conflict', function () {
      expect(conflictBoard.hasAnyQueensConflicts()).to.be.equal(true);
    });
  });

  describe('Board with col conflicts', function () {
    var matrix = [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var colConflictboard = new Board(matrix);

    it('should find a column conflict', function () {
      expect(colConflictboard.hasColConflictAt(0)).to.be.equal(true);
      expect(colConflictboard.hasColConflictAt(1)).to.be.equal(false);
    });

    it('should not find a row conflict', function () {
      expect(colConflictboard.hasAnyRowConflicts()).to.be.equal(false);
    });

    it('should find any col conflict', function () {
      expect(colConflictboard.hasAnyColConflicts()).to.be.equal(true);
    });

    it('should find a rooks conflict', function () {
      expect(colConflictboard.hasAnyRooksConflicts()).to.be.equal(true);
    });

    it('should not find a majorDiagonal conflict', function () {
      console.log('++++++++++');
      expect(colConflictboard.hasAnyMajorDiagonalConflicts()).to.be.equal(false);
      console.log('----------');
    });

    it('should not find a minorDiagonal conflict', function () {
      expect(colConflictboard.hasAnyMinorDiagonalConflicts()).to.be.equal(false);
    });

    it('should find a queens conflict', function () {
      expect(colConflictboard.hasAnyQueensConflicts()).to.be.equal(true);
    });
  });

  describe('Board with major diagonal conflicts', function () {
    var matrix = [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var mdConflictBoard = new Board(matrix);//asynchronous function
    it('should find a major diag conflicts', function () {
      expect(mdConflictBoard.hasMajorDiagonalConflictAt(0)).to.be.equal(false);
    });

    it('should not find a row conflict', function () {
      expect(mdConflictBoard.hasAnyRowConflicts()).to.be.equal(false);
    });

    it('should not find a col conflict', function () {
      expect(mdConflictBoard.hasAnyColConflicts()).to.be.equal(false);
    });

    it('should not find a rooks conflict', function () {
      expect(mdConflictBoard.hasAnyRooksConflicts()).to.be.equal(false);
    });

    it('should find a majorDiagonal conflict', function () {
      expect(mdConflictBoard.hasAnyMajorDiagonalConflicts()).to.be.equal(true);
    });

    it('should not find a minorDiagonal conflict', function () {
      expect(mdConflictBoard.hasAnyMinorDiagonalConflicts()).to.be.equal(false);
    });

    it('should find a queens conflict', function () {
      expect(mdConflictBoard.hasAnyQueensConflicts()).to.be.equal(true);
    });

    matrix = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ];
    newMDConflictBoard = new Board(matrix);

    it('should not find a row conflict', function () {
      expect(newMDConflictBoard.hasAnyRowConflicts()).to.be.equal(false);
    });

    it('should not find a col conflict', function () {
      expect(newMDConflictBoard.hasAnyColConflicts()).to.be.equal(false);
    });

    it('should not find a rooks conflict', function () {
      expect(newMDConflictBoard.hasAnyRooksConflicts()).to.be.equal(false);
    });

    it('should find a majorDiagonal conflict', function () {
      expect(newMDConflictBoard.hasAnyMajorDiagonalConflicts()).to.be.equal(true);
    });

    it('should not find a minorDiagonal conflict', function () {
      expect(newMDConflictBoard.hasAnyMinorDiagonalConflicts()).to.be.equal(false);
    });

    it('should find a queens conflict', function () {
      expect(newMDConflictBoard.hasAnyQueensConflicts()).to.be.equal(true);
    });
  });

  describe('Board with minor diagonal conflicts', function () {
    var matrix = [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    var MinorConflictBoard = new Board(matrix);

    it('should not find a row conflict', function () {
      expect(MinorConflictBoard.hasAnyRowConflicts()).to.be.equal(false);
    });

    it('should not find a col conflict', function () {
      expect(MinorConflictBoard.hasAnyColConflicts()).to.be.equal(false);
    });

    it('should not find a rooks conflict', function () {
      expect(MinorConflictBoard.hasAnyRooksConflicts()).to.be.equal(false);
    });

    it('should not find a majorDiagonal conflict', function () {
      expect(MinorConflictBoard.hasAnyMajorDiagonalConflicts()).to.be.equal(false);
    });

    it('should find a minorDiagonal conflict', function () {
      expect(MinorConflictBoard.hasAnyMinorDiagonalConflicts()).to.be.equal(true);
    });

    it('should find a queens conflict', function () {
      expect(MinorConflictBoard.hasAnyQueensConflicts()).to.be.equal(true);
    });

    matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ];
    newMinorConflictBoard = new Board(matrix);

    it('should not find a row conflict', function () {
      expect(newMinorConflictBoard.hasAnyRowConflicts()).to.be.equal(false);
    });

    it('should not find a col conflict', function () {
      expect(newMinorConflictBoard.hasAnyColConflicts()).to.be.equal(false);
    });

    it('should not find a rooks conflict', function () {
      expect(newMinorConflictBoard.hasAnyRooksConflicts()).to.be.equal(false);
    });

    it('should not find a majorDiagonal conflict', function () {
      expect(newMinorConflictBoard.hasAnyMajorDiagonalConflicts()).to.be.equal(false);
    });

    it('should find a minorDiagonal conflict', function () {
      expect(newMinorConflictBoard.hasAnyMinorDiagonalConflicts()).to.be.equal(true);
    });

    it('should find a queens conflict', function () {
      expect(newMinorConflictBoard.hasAnyQueensConflicts()).to.be.equal(true);
    });
  });
});
