import { inverseModuloMatrix, multiplyMatrixMod } from "@/lib/Matrix";
import { Cipher } from "./Cipher";
import { TextCipher } from "./TextCipher";
import * as math from "mathjs";
import { Padding } from "@/lib/encoder/Padding";

const KEY_SPACE = 26;

export class TextHillCipher extends TextCipher implements Cipher {
  private key: math.Matrix;
  private invKey: math.Matrix;
  private m: number;
  private padding: Padding;

  constructor(key: number[][]) {
    super();

    // Check key
    for (let i = 0; i < key.length; i++) {
      if (key[i].length !== key.length) {
        throw new Error("Key should be a square matrix");
      }
    }

    this.m = key.length;
    this.key = math.transpose(math.matrix(key));
    this.invKey = math.transpose(inverseModuloMatrix(key, KEY_SPACE));
    this.padding = new Padding(this.m, 97, KEY_SPACE);
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    const cleanedPlaintext = this.plaintextCleaning(plaintext);
    plaintext = this.padding.pad(cleanedPlaintext);

    const ciphertext = new Uint8Array(plaintext.length);

    for (let i = 0; i < plaintext.length; i += this.m) {
      const char = plaintext.slice(i, i + this.m);
      const charCode: number[] = [];

      char.map((c) => c - 97).forEach((el) => charCode.push(el));
      const data = math.matrix(charCode);
      const result = multiplyMatrixMod(data, this.key, KEY_SPACE).toArray();

      let j = i;
      for (let k = 0; k < result.length; k++, j++) {
        ciphertext[j] = (result.at(k)?.valueOf() as number) + 97;
      }
    }

    return ciphertext;
  }

  decrypt(ciphertext: Uint8Array): Uint8Array {
    const paddedPlaintext = new Uint8Array(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i += this.m) {
      const char = ciphertext.slice(i, i + this.m);
      const charCode: number[] = [];

      char.map((c) => c - 97).forEach((el) => charCode.push(el));
      const data = math.matrix(charCode);
      const result = multiplyMatrixMod(data, this.invKey, KEY_SPACE).toArray();

      let j = i;
      for (let k = 0; k < result.length; k++, j++) {
        paddedPlaintext[j] = (result.at(k)?.valueOf() as number) + 97;
      }
    }

    const plaintext = this.padding.unpad(paddedPlaintext);
    return plaintext;
  }
}
