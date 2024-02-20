import { Cipher } from "./Cipher";

export default class VigenereStandard implements Cipher {
  encrypt(plaintext: Uint8Array, key: Uint8Array): Uint8Array {
    throw new Error("Method not implemented.");
  }
  decrypt(ciphertext: Uint8Array, key: Uint8Array): Uint8Array {
    throw new Error("Method not implemented.");
  }
}
