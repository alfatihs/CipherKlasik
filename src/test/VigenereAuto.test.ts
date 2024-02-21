import VigenereAuto from "@/lib/cipher/VigenereAuto";
import { decodeString, encodeString } from "../lib/encoder/Encoder";

var keyString = "indo";
var keyUint = encodeString(keyString);

describe("Test Vigenere Standard cipher ", () => {
  it("should encrypt correctyly", () => {
    const vigenereCipher = new VigenereAuto(keyUint);
    const plaintext =
      "negara penghasil  123123!!--minyak mentah di dunia !2123891237198!";

    const result = vigenereCipher.encrypt(encodeString(plaintext));
    var decodedResult = decodeString(result);
    // expect(decodedResult).toBe("LVVQHZNGFHRVL");
    expect(decodedResult).toBe("vrjoeeveegwefosmavjmszcndmlqbdbqqd");
  });

  it("should decrypt correctyly", () => {
    const vigenereCipher = new VigenereAuto(keyUint);
    const plaintext = "negarapenghasilminyakmentahdidunia";

    const result = vigenereCipher.encrypt(encodeString(plaintext));
    // var decodedResult = decodeString(result);

    const decrypt = decodeString(vigenereCipher.decrypt(result));
    expect(decrypt).toBe(plaintext);
  });
});
