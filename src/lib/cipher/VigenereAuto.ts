import { Cipher } from "./Cipher";
import { TextCipher } from "./TextCipher";
import { decodeString } from "../encoder/Encoder";
export default class VigenereAuto extends TextCipher implements Cipher {
  private readonly alphabet: string;
  private readonly key: Uint8Array;
  private vigenereMatrix: string[][] = [];

  constructor(key: Uint8Array) {
    super();
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

  private getKeyStream(cleanedPlainTextString: string): string {
    let keyStream: string = "";
    let neededLength: number = cleanedPlainTextString.length - this.key.length;
    keyStream =
      decodeString(this.key) +
      cleanedPlainTextString.substring(0, neededLength);
    return keyStream;
    // kalau decrypt, dia malah INDOVRJOEEVEEGWE dsb
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    var cleanedPlainText = this.plaintextCleaning(plaintext);
    const keyStream = this.getKeyStream(decodeString(cleanedPlainText));
    const ciphertext = new Uint8Array(cleanedPlainText.length);

    for (let i = 0; i < cleanedPlainText.length; i++) {
      const plainCharIndex = this.alphabet.indexOf(
        String.fromCharCode(cleanedPlainText[i])
      );
      const keyCharIndex = this.alphabet.indexOf(keyStream[i]);
      if (plainCharIndex === -1) {
        ciphertext[i] = cleanedPlainText[i];
      } else {
        ciphertext[i] =
          this.vigenereMatrix[plainCharIndex][keyCharIndex].charCodeAt(0);
      }
    }

    return ciphertext;

    // throw new Error("Method not implemented.");
  }
  decrypt(ciphertext: Uint8Array): Uint8Array {
    var keyStream = decodeString(this.key);
    const plaintext = new Uint8Array(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i++) {
      const keyCharIndex = this.alphabet.indexOf(keyStream[i]);
      const cipherChar = String.fromCharCode(ciphertext[i]);
      const cipherCharIndex = this.alphabet.indexOf(cipherChar);
      const originalCharIndex =
        (cipherCharIndex - keyCharIndex + this.alphabet.length) %
        this.alphabet.length;
      if (originalCharIndex === -1) {
        plaintext[i] = ciphertext[i];
      } else {
        plaintext[i] = this.alphabet.charCodeAt(originalCharIndex);
      }
      keyStream = keyStream + this.alphabet[originalCharIndex];
    }

    return plaintext;

    // throw new Error("Method not implemented.");
  }
}
