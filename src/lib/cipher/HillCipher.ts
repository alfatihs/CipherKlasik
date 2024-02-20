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
    this.key = math.matrix(key);

    const det = math.det(this.key);
    const inv = (math as any).invmod(det);

    this.invKey = math
      .inv(this.key)
      .map((x) => x * det)
      .map((x) => math.mod(x * inv, 26));
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    plaintext = this.plaintextCleaning(plaintext);
    const ciphertext = new Uint8Array(plaintext.length);

    for (let i = 0; i < plaintext.length; i += this.m) {
      const char = plaintext.slice(i, i + this.m);
      const charCode = char.map((c) => c - 97);
      const result = math
        .mod(math.multiply(this.key, math.matrix(charCode)), 26)
        .toArray();

      for (let j = 0; j < result.length; j++) {
        ciphertext[i + j] = result[j] + 97;
      }
    }
  }
  decrypt(ciphertext: Uint8Array): Uint8Array {
    throw new Error("Method not implemented.");
  }
}
