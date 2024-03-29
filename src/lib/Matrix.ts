import * as math from "mathjs";

export function inverseModuloMatrix(
  matrix: number[][],
  mod: number
): math.Matrix {
  const adj = getAdjugateMatrix(matrix);
  const det = math.det(matrix);
  const detInv = (math as any).invmod(det, mod);

  if (detInv == null || Number.isNaN(detInv)) {
    throw new Error("matrix doesn't have inverse");
  }

  const inv = math.multiply(detInv, adj);
  return inv
    .map((val) => math.mod(val, mod))
    .map((val) => (val < 0 ? val + mod : val));
}

export function multiplyMatrixMod(
  mat1: math.Matrix,
  mat2: math.Matrix,
  mod: number
): math.Matrix {
  const result = math.multiply(mat1, mat2);
  return result
    .map((val) => math.mod(val, mod))
    .map((val) => (val < 0 ? val + mod : val));
}

export function getAdjugateMatrix(matrix: number[][]): math.Matrix {
  const cofactor = getCofactorMatrix(matrix);
  const adjugate = math.transpose(cofactor);

  return adjugate;
}

export function getMinorMatrix(
  matrix: number[][],
  row: number,
  col: number
): math.Matrix {
  const cofactor = [];

  for (let i = 0; i < matrix.length; i++) {
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
