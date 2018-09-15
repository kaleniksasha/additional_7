class SudokuSolver {
  constructor(matrix) {
    this.matrix = matrix;
  }

  getBox(y, x) {
    y -= y % 3;
    x -= x % 3;

    let box = [];
    for (let i = y; i < y + 3; i++) {
      box = box.concat(this.matrix[i].slice(x, x + 3));
    }

    return box;
  }

  getColumn(x) {
    let column = Array(this.matrix.length);
    for (let i = 0; i < this.matrix.length; i++) {
      column[i] = this.matrix[i][x];
    }
    return column;
  }

  validate(arr) {
    let s = new Set();
    return arr.every(i => {
      if (i === 0 || s.has(i) === false) {
        s.add(i);
        return true;
      } else {
        return false;
      }
    });
  }

  solve() {
    let y, x;
    let f = false;
    for (let i = 0; !f && i < this.matrix.length; i++) {
      for (let j = 0; !f && j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] === 0) (y = i), (x = j), (f = true);
      }
    }

    if (!f) return true;

    for (let n = 1; n <= 9; n++) {
      this.matrix[y][x] = n;
      let row = this.matrix[y];
      let column = this.getColumn(x);
      let box = this.getBox(y, x);
      if (this.validate(row) && this.validate(column) && this.validate(box)) {
        if (this.solve()) return true;
      }
    }

    this.matrix[y][x] = 0;
  }

  static solve(matrix) {
    new SudokuSolver(matrix).solve();
    return matrix;
  }
}

module.exports = function solveSudoku(matrix) {
  return SudokuSolver.solve(matrix);
};
