import { decodeString } from "../encoder/Encoder";
import { Cipher } from "./Cipher";
import { TextCipher } from "./TextCipher";

export default class VigenereExtended extends TextCipher implements Cipher {
  private readonly alphabet: string;
  private readonly key: Uint8Array;
  private vigenereMatrix: string[][] = [];

  constructor(key: Uint8Array) {
    super();
    // Extend the alphabet to cover all 256 ASCII characters
    this.alphabet = Array.from({ length: 256 }, (_, i) =>
      String.fromCharCode(i)
    ).join("");
    this.generateVigenereMatrix();
    this.key = key;
  }

  private generateVigenereMatrix(): void {
    this.vigenereMatrix = [];
    for (let i = 0; i < this.alphabet.length; i++) {
      const row = this.alphabet
        .slice(i)
        .concat(this.alphabet.slice(0, i))
        .split("");
      this.vigenereMatrix.push(row);
    }
  }

  private getKeyStream(length: number): Uint8Array {
    const keyStream = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      keyStream[i] = this.key[i % this.key.length];
    }
    return keyStream;
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    const keyStream = this.getKeyStream(plaintext.length);
    const ciphertext = new Uint8Array(plaintext.length);

    for (let i = 0; i < plaintext.length; i++) {
      const plainCharIndex = this.alphabet.indexOf(
        String.fromCharCode(plaintext[i])
      );
      const keyCharIndex = keyStream[i];
      if (plainCharIndex === -1) {
        ciphertext[i] = plaintext[i];
      } else {
        ciphertext[i] =
          this.vigenereMatrix[plainCharIndex][keyCharIndex].charCodeAt(0);
        var decodeCipherChar = decodeString(ciphertext);
        var cipherChar = String.fromCharCode(ciphertext[i]);
      }
    }

    return ciphertext;
  }

  decrypt(ciphertext: Uint8Array): Uint8Array {
    const keyStream = this.getKeyStream(ciphertext.length);
    const plaintext = new Uint8Array(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i++) {
      const keyCharIndex = keyStream[i];
      const cipherChar = String.fromCharCode(ciphertext[i]);
      const plainCharIndex =
        this.vigenereMatrix[keyCharIndex].indexOf(cipherChar);
      if (plainCharIndex === -1) {
        plaintext[i] = ciphertext[i];
      } else {
        plaintext[i] = plainCharIndex;
      }
    }

    return plaintext;
  }
}
