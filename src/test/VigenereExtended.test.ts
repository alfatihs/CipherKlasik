// import Vigene from "../lib/cipher/VigenereExtended";
import VigenereExtended from "@/lib/cipher/VigenereExtended";
import { decodeString, encodeString } from "../lib/encoder/Encoder";

var keyString = "sony";
var keyUint = encodeString(keyString);

describe("Test Vigenere Extended cipher ", () => {
  // it("should encrypt correctyly", () => {
  //   const vigenereCipher = new VigenereExtended(keyUint);
  //   const plaintext = "thisplaintext";

  //   const result = vigenereCipher.encrypt(encodeString(plaintext));
  //   var decodedResult = decodeString(result);

  //   // expect(decodedResult).toBe("LVVQHZNGFHRVL");
  //   expect(decodedResult).toBe("lvvqhzngfhrvl");
  // });
  // permasalahannya di decode nya , decodenya ga bisa ngebaca ASCII yang jauh.

  it("should decrypt correctyly", () => {
    const vigenereCipher = new VigenereExtended(keyUint);
    const plaintext = "hellowo 102938120932819 !!! asdasdSADDASKJH -11~rld";

    const result = vigenereCipher.encrypt(encodeString(plaintext));
    var decodedResult = decodeString(result);

    const decrypt = decodeString(vigenereCipher.decrypt(result));
    expect(decrypt).toBe(plaintext);
  });
});
