import TextAffineCipher from "./cipher/AffineCipher";
import { Cipher } from "./cipher/Cipher";
import { TextHillCipher } from "./cipher/HillCipher";
import PlayfairCipher from "./cipher/PlayfairCipher";
import { SuperEncryption } from "./cipher/SuperEncryptionCipher";
import { TranspositionCipher } from "./cipher/TranspositionCipher";
import VigenereAuto from "./cipher/VigenereAuto";
import VigenereExtended from "./cipher/VigenereExtended";
import VigenereStandard from "./cipher/VigenereStandard";
import { encodeString } from "./encoder/Encoder";
import { generateKey as affineGenerateKey } from "./keygen/AffineCipherKeygen";
import { generateKey as hillGenerateKey } from "./keygen/HillCipherKeygen";

export enum CipherType {
  Affine,
  Hill,
  SuperEncryption,
  Playfair,
  VigenereStandard,
  VigenereExtended,
  VigenereAutokey,
}

export function encryptFromString(
  type: CipherType,
  key: string,
  message: string
): Uint8Array {
  const cipher = getCipher(type, key);
  return cipher.encrypt(encodeString(message));
}

export function encryptRawBuffer(
  type: CipherType,
  key: string,
  buffer: Buffer
): Uint8Array {
  const cipher = getCipher(type, key);
  return cipher.encrypt(buffer);
}

export function encryptFile(type: CipherType, key: string, buffer: Buffer) {
  const result = encryptRawBuffer(type, key, buffer);
  const encryptedFile = Buffer.from(result).toString("base64");

  return encryptedFile;
}

export function encryptString(
  type: CipherType,
  key: string,
  data: string
): string {
  const cipher = getCipher(type, key);
  return Buffer.from(cipher.encrypt(encodeString(data))).toString("base64");
}

export function decryptToString(
  type: CipherType,
  key: string,
  message: string
): string {
  const cipher = getCipher(type, key);
  const ciphertext = Buffer.from(message, "base64").valueOf();
  return Buffer.from(cipher.decrypt(ciphertext)).toString("utf-8");
}

export function decryptFile(
  type: CipherType,
  key: string,
  encryptedFile: string
): Buffer {
  const buffer = Buffer.from(encryptedFile, "base64");
  const cipher = getCipher(type, key);
  const result = cipher.decrypt(buffer);

  return Buffer.from(result);
}

export function getCipher(type: CipherType, key: string): Cipher {
  switch (type) {
    case CipherType.Affine:
      const affineKey = affineGenerateKey(key);
      return new TextAffineCipher(affineKey.m, affineKey.b);
    case CipherType.Hill:
      const hillKey = hillGenerateKey(key);
      return new TextHillCipher(hillKey);
    case CipherType.SuperEncryption:
      const keyArray = key.split(" ");
      let column = parseInt(keyArray[1]);

      if (!column || Number.isNaN(column) || column < 1) {
        column = 5;
      }

      const vigenere = new VigenereExtended(encodeString(keyArray[0]));
      const transposition = new TranspositionCipher(column);

      return new SuperEncryption([vigenere, transposition]);
    case CipherType.Playfair:
      return new PlayfairCipher(encodeString(key));
    case CipherType.VigenereStandard:
      return new VigenereStandard(encodeString(key));
    case CipherType.VigenereExtended:
      return new VigenereExtended(encodeString(key));
    case CipherType.VigenereAutokey:
      return new VigenereAuto(encodeString(key));
  }
}
