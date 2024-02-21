import { Cipher } from "./Cipher";

export class SuperEncryption implements Cipher {
  constructor(private cipherChain: Cipher[]) {}

  encrypt(data: Uint8Array): Uint8Array {
    return this.cipherChain.reduce(
      (data, cipher) => cipher.encrypt(data),
      data
    );
  }

  decrypt(data: Uint8Array): Uint8Array {
    return this.cipherChain.reduceRight(
      (data, cipher) => cipher.decrypt(data),
      data
    );
  }
}
