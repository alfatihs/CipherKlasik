import { Cipher } from "./Cipher";

export default class VigenereStandard implements Cipher {
  private readonly alphabet: string;
  private readonly key: Uint8Array;
  private vigenereMatrix: string[][] = [];

  constructor(key: Uint8Array) {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
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

  private getKeyStream(length: number): string {
    let keyStream: string = "";
    for (let i = 0; i < length; i++) {
      keyStream += String.fromCharCode(this.key[i % this.key.length]);
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
      const keyCharIndex = this.alphabet.indexOf(keyStream[i]);
      if (plainCharIndex === -1) {
        ciphertext[i] = plaintext[i];
      } else {
        ciphertext[i] =
          this.vigenereMatrix[plainCharIndex][keyCharIndex].charCodeAt(0);
      }
    }

    return ciphertext;

    // throw new Error("Method not implemented.");
  }
  decrypt(ciphertext: Uint8Array): Uint8Array {
    const keyStream = this.getKeyStream(ciphertext.length);
    const plaintext = new Uint8Array(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i++) {
      const keyCharIndex = this.alphabet.indexOf(keyStream[i]);
      const cipherChar = String.fromCharCode(ciphertext[i]);
      const plainCharIndex =
        this.vigenereMatrix[keyCharIndex].indexOf(cipherChar);
      if (plainCharIndex === -1) {
        plaintext[i] = ciphertext[i];
      } else {
        plaintext[i] = this.alphabet.charCodeAt(plainCharIndex);
      }
    }

    return plaintext;

    // throw new Error("Method not implemented.");
  }
}
