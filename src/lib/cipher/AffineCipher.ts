import { decodeString, encodeString } from "../encoder/Encoder";
import { Cipher } from "./Cipher";
import * as math from "mathjs";
import { TextCipher } from "./TextCipher";

export default class TextAffineCipher extends TextCipher implements Cipher {
  private invM: number;
  constructor(private m: number, private b: number) {
    super();
    this.invM = (math as any).invmod(m, 26);

    if (Number.isNaN(this.invM) || this.invM === null) {
      throw new Error("Key m should be prime relative to 26");
    }
  }

  encrypt(plaintext: Uint8Array): Uint8Array {
    plaintext = this.plaintextCleaning(plaintext);
    const ciphertext = new Uint8Array(plaintext.length);

    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext[i];
      const charCode = char - 97;
      let newCharCode = math.mod(this.m * charCode + this.b, 26);

      if (newCharCode < 0) newCharCode += 26;

      ciphertext[i] = newCharCode + 97;
    }

    return ciphertext;
  }

  decrypt(ciphertext: Uint8Array): Uint8Array {
    const plaintext = new Uint8Array(ciphertext.length);

    for (let i = 0; i < ciphertext.length; i++) {
      const char = ciphertext[i];
      const charCode = char - 97;
      let newCharCode = math.mod(this.invM * (charCode - this.b), 26);

      if (newCharCode < 0) newCharCode += 26;

      plaintext[i] = newCharCode + 97;
    }

    return plaintext;
  }
}
