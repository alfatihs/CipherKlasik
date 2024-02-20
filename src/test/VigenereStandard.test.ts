import VigenereStandard from "../lib/cipher/VigenereStandard";
import { decodeString, encodeString } from "../lib/encoder/Encoder";

var keyString = "sony";
var keyUint = encodeString(keyString);

describe("Test Vigenere Standard cipher ", () => {
  it("should encrypt correctyly", () => {
    const vigenereCipher = new VigenereStandard(keyUint);
    const plaintext = "HelLo WOrl D12312312123!@*(#(*&$#*!(&*(!@#";

    const result = vigenereCipher.encrypt(encodeString(plaintext));
    var decodedResult = decodeString(result);
    expect(decodedResult).toBe("zsyjgkbpdr");
  });

  it("should decrypt correctyly", () => {
    const vigenereCipher = new VigenereStandard(keyUint);
    const plaintext = "helloworld";

    const result = vigenereCipher.encrypt(encodeString(plaintext));
    var decodedResult = decodeString(result);

    const decrypt = decodeString(vigenereCipher.decrypt(result));
    expect(decrypt).toBe(plaintext);
  });
});
