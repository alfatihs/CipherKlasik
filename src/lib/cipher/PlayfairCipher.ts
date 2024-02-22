import { Cipher } from "./Cipher";
import { TextCipher } from "./TextCipher";
import { decodeString, encodeString } from "../encoder/Encoder";
import { decode } from "punycode";

export default class PlayfairCipher extends TextCipher implements Cipher {
  private readonly alphabet: string;
  private readonly playfairMatrix: string[][] = [];

  constructor(key: Uint8Array) {
    super();
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.generatePlayfairMatrix(key);
  }

  private generatePlayfairMatrix(key: Uint8Array): void {
    const filteredKey = this.plaintextCleaning(key);
    const decodedKey = decodeString(filteredKey);
    const uniqueChars = this.getUniqueChars(decodedKey + this.alphabet).replace(
      "j",
      ""
    );

    let matrixIndex = 0;
    for (let i = 0; i < 5; i++) {
      const row: string[] = [];
      for (let j = 0; j < 5; j++) {
        if (matrixIndex < uniqueChars.length) {
          row.push(uniqueChars[matrixIndex++]);
        }
      }
      this.playfairMatrix.push(row);
    }
  }

  private getUniqueChars(str: string): string {
    return str
      .split("")
      .filter((char, index, self) => self.indexOf(char) === index)
      .join("");
  }

  private findCharPosition(char: string): { row: number; col: number } {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.playfairMatrix[row][col] === char) {
          return { row, col };
        }
      }
    }
    throw new Error(`Character '${char}' not found in Playfair matrix.`);
  }

  private encryptPair(pair: string): string {
    const firstCharPos = this.findCharPosition(pair[0]);
    const secondCharPos = this.findCharPosition(pair[1]);

    if (firstCharPos.row === secondCharPos.row) {
      return (
        this.playfairMatrix[firstCharPos.row][(firstCharPos.col + 1) % 5] +
        this.playfairMatrix[secondCharPos.row][(secondCharPos.col + 1) % 5]
      );
    } else if (firstCharPos.col === secondCharPos.col) {
      return (
        this.playfairMatrix[(firstCharPos.row + 1) % 5][firstCharPos.col] +
        this.playfairMatrix[(secondCharPos.row + 1) % 5][secondCharPos.col]
      );
    } else {
      return (
        this.playfairMatrix[firstCharPos.row][secondCharPos.col] +
        this.playfairMatrix[secondCharPos.row][firstCharPos.col]
      );
    }
  }

  private decryptPair(pair: string): string {
    const firstCharPos = this.findCharPosition(pair.charAt(0));
    const secondCharPos = this.findCharPosition(pair.charAt(1));

    if (firstCharPos.row === secondCharPos.row) {
      return (
        this.playfairMatrix[firstCharPos.row][(firstCharPos.col + 4) % 5] +
        this.playfairMatrix[secondCharPos.row][(secondCharPos.col + 4) % 5]
      );
    } else if (firstCharPos.col === secondCharPos.col) {
      return (
        this.playfairMatrix[(firstCharPos.row + 4) % 5][firstCharPos.col] +
        this.playfairMatrix[(secondCharPos.row + 4) % 5][secondCharPos.col]
      );
    } else {
      return (
        this.playfairMatrix[firstCharPos.row][secondCharPos.col] +
        this.playfairMatrix[secondCharPos.row][firstCharPos.col]
      );
    }
  }

  private processString(input: string): string {
    let processedString = "";
    for (let i = 0; i < input.length; i++) {
      processedString += input[i];
      if (i < input.length - 1 && input[i] === input[i + 1]) {
        if (input[i] !== "x") {
          //apabila double x, dibiarkan
          processedString += "x";
        }
      }
    }
    if (processedString.length % 2 !== 0) {
      processedString += "x";
    }
    return processedString;
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    const plaintextCleaned = this.plaintextCleaning(plaintext);
    const plaintextString = decodeString(plaintextCleaned).replaceAll("j", "i");
    const processedPlainText = this.processString(plaintextString);

    let encryptedText = "";

    for (let i = 0; i < processedPlainText.length; i += 2) {
      const pair = processedPlainText.substring(i, i + 2);
      encryptedText += this.encryptPair(pair);
    }

    return encodeString(encryptedText);
  }

  decrypt(ciphertext: Uint8Array): Uint8Array {
    const ciphertextCleaned = this.plaintextCleaning(ciphertext);
    const ciphertextString = decodeString(ciphertextCleaned);

    let decryptedText = "";

    for (let i = 0; i < ciphertextString.length; i += 2) {
      const pair = ciphertextString.substring(i, i + 2);
      decryptedText += this.decryptPair(pair);
    }

    return encodeString(decryptedText);
  }
}
