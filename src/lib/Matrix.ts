import * as math from "mathjs";

export function inverseModulo(a: number, m: number): number {}

export function getAdjugateMatrix(matrix: math.Matrix): math.Matrix {
  const cofactor = getCofactorMatrix(matrix);
  const adjugate = math.transpose(cofactor);

  return adjugate;
}

export function getMinorMatrix(
  matrix: math.Matrix,
  row: number,
  col: number
): math.Matrix {
  const cofactor = [];
  const arrayMatrix = matrix.toArray();

  for (let i = 0; i < arrayMatrix.length; i++) {
    if (i === row) continue;

    const rowVal = [];

    for (let j = 0; j < matrix.length; j++) {
      if (j === col) continue;

      rowVal.push(matrix[i][j]);
    }

    cofactor.push(rowVal);
  }

  return math.matrix(cofactor);
}

export function getCofactorMatrix(matrix: number[][]): math.Matrix {
  const cofactor = [];

  for (let i = 0; i < matrix.length; i++) {
    const rowVal = [];

    for (let j = 0; j < matrix.length; j++) {
      const minor = getMinorMatrix(matrix, i, j);
      const minorDet = math.det(minor);
      const sign = (i + j) % 2 === 0 ? 1 : -1;

      rowVal.push(minorDet * sign);
    }

    cofactor.push(rowVal);
  }

  return math.matrix(cofactor);
}
