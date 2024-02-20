import { inverseModuloMatrix } from "@/lib/Matrix";
import { Cipher } from "./Cipher";
import { TextCipher } from "./TextCipher";
import * as math from "mathjs";

export class TextHillCipher extends TextCipher implements Cipher {
  private key: math.Matrix;
  private invKey: math.Matrix;
  private m: number;

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
    this.invKey = math.transpose(inverseModuloMatrix(key, 26));
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    plaintext = this.plaintextCleaning(plaintext);
    const ciphertext = new Uint8Array(plaintext.length);

    for (let i = 0; i < plaintext.length; i += this.m) {
      const char = plaintext.slice(i, i + this.m);
      const charCode: number[] = [];

      char.map((c) => c - 97).forEach((el) => charCode.push(el));
      const data = math.matrix(charCode);
      const result = math.multiply(data, this.key).toArray();

      let j = i;
      for (let k = 0; k < result.length; k++, j++) {
        ciphertext[j] = (result.at(k)?.valueOf() as number) + 97;
      }
    }

    return ciphertext;
  }

  decrypt(ciphertext: Uint8Array): Uint8Array {
    const plaintext = new Uint8Array(ciphertext.length);

    for (let i = 0; i < plaintext.length; i += this.m) {
      const char = plaintext.slice(i, i + this.m);
      const charCode: number[] = [];

      char.map((c) => c - 97).forEach((el) => charCode.push(el));
      const data = math.matrix(charCode);
      const result = math.multiply(data, this.invKey).toArray();

      let j = i;
      for (let k = 0; k < result.length; k++, j++) {
        plaintext[j] = (result.at(k)?.valueOf() as number) + 97;
      }
    }

    return plaintext;
  }
}
