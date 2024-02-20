import { Cipher } from "crypto";
import { decodeString, encodeString } from "../encoder/Encoder";

export abstract class TextCipher {
  protected plaintextCleaning(plaintext: Uint8Array): Uint8Array {
    const data = decodeString(plaintext).toLowerCase();
    const cleanedData = data.replace(/[^a-z]/g, "");

    return encodeString(cleanedData);
  }
}
