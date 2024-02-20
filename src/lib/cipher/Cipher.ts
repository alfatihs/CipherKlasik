export interface Cipher {
  encrypt(plaintext: Uint8Array, key: Uint8Array): Uint8Array;
  decrypt(ciphertext: Uint8Array, key: Uint8Array): Uint8Array;
}
