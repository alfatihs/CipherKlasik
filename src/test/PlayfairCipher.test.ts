import PlayfairCipher from "@/lib/cipher/PlayfairCipher";
import { decodeString, encodeString } from "../lib/encoder/Encoder";

var keyString = "jalanganeshasepuluh";
var keyUint = encodeString(keyString);

describe("Test Playfair Cipher ", () => {
  it("should encrypt correctyly", () => {
    const vigenereCipher = new PlayfairCipher(keyUint);
    const plaintext = "temuiibunantimalam";

    const result = vigenereCipher.encrypt(encodeString(plaintext));
    var decodedResult = decodeString(result);
    // expect(decodedResult).toBe("LVVQHZNGFHRVL");
    expect(decodedResult).toBe("zbrsfykupglgrkvsnlqv");
  });

  it("should decrypt correctyly", () => {
    const vigenereCipher = new PlayfairCipher(keyUint);
    const plaintext = "temuixibunjantimalam";

    const result = vigenereCipher.encrypt(encodeString(plaintext));

    const decrypt = decodeString(vigenereCipher.decrypt(result));
    expect(decrypt).toBe("temuixibuniantimalam");
  });
});
