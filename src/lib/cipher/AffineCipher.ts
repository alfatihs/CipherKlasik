import { Cipher } from "./Cipher";

export default class AffineCipher implements Cipher {
  encrypt(plaintext: Uint8Array): Uint8Array {
    throw new Error("Method not implemented.");
  }
  decrypt(ciphertext: Uint8Array): Uint8Array {
    throw new Error("Method not implemented.");
  }
}
