module.exports = function solveSudoku(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] === 0) {
        let noVar = [];
        for (let i = 0; i < matrix.length; i++) {
              noVar.push(matrix[row][i])
              noVar.push(matrix[i][col]);
        }
        let rows = Math.trunc(row/3)*3;
        let cols = Math.trunc(col/3)*3;
        for (let i = rows; i < rows+3; i++) {
          for (let j = cols; j < cols+3; j++) {
           if (matrix[i][j]) {
             noVar.push(matrix[i][j]);
          }
         }
      }
        let variables = [1,2,3,4,5,6,7,8,9];
        const realVar = variables.filter(number => noVar.indexOf(number) < 0 );
        let solve = [];
        for (let y = 0; y < realVar.length; y++) {
           matrix[row][col] = realVar[y];
           solve = solveSudoku(matrix);
           if (solve) return solve;
        }
        matrix[row][col] = 0;
        return false;
      }
    }
  }
  return matrix;
}
