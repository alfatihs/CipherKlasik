import { Padding } from "../encoder/Padding";
import { Cipher } from "./Cipher";
import * as math from "mathjs";

export class TranspositionCipher implements Cipher {
  private padding: Padding;

  constructor(private columnSize: number) {
    this.padding = new Padding(columnSize, 0, 256);
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    const padded = this.padding.pad(plaintext);

    const data: number[] = [];
    padded.forEach((el) => data.push(el));

    const matrix = math.matrix(data);
    const reshaped = math
      .reshape(
        math.transpose(
          math.reshape(matrix, [data.length / this.columnSize, this.columnSize])
        ),
        [1, data.length]
      )
      .toArray();

    const result: number[] = reshaped[0].valueOf() as number[];

    const resultUint8 = new Uint8Array(result.length);
    for (let i = 0; i < result.length; i++) {
      resultUint8[i] = result[i];
    }

    return resultUint8;
  }

  decrypt(ciphertext: Uint8Array): Uint8Array {
    const data: number[] = [];
    ciphertext.forEach((el) => data.push(el));

    const size = data.length;
    const matrix = math.matrix(data);
    const reshaped = math
      .reshape(
        math.transpose(
          math.reshape(matrix, [this.columnSize, size / this.columnSize])
        ),
        [1, size]
      )
      .toArray();

    const result: number[] = reshaped[0].valueOf() as number[];

    const resultUint8 = new Uint8Array(result.length);
    for (let i = 0; i < result.length; i++) {
      resultUint8[i] = result[i];
    }

    return this.padding.unpad(resultUint8);
  }
}
