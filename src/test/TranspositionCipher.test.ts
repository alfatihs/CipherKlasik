import { TranspositionCipher } from "@/lib/cipher/TranspositionCipher";
import { decodeString, encodeString } from "@/lib/encoder/Encoder";

describe("Transposition Cipher Test", () => {
  it("should able to encrypt and decrypt back", () => {
    const transpositionCipher = new TranspositionCipher(5);
    const plaintext = "halodunia";

    const result = transpositionCipher.encrypt(encodeString(plaintext));
    const decrypt = transpositionCipher.decrypt(result);

    expect(decodeString(decrypt)).toStrictEqual(plaintext);
  });
});
