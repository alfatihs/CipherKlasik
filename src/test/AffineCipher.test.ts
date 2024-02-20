import TextAffineCipher from "../lib/cipher/AffineCipher";
import { decodeString, encodeString } from "../lib/encoder/Encoder";

describe("Test affine cipher", () => {
  it("should encrypt and decrypt correctly", () => {
    const affineCipher = new TextAffineCipher(5, 3);
    const plaintext = "helloworld";

    const result = affineCipher.encrypt(encodeString(plaintext));
    const decrypt = decodeString(affineCipher.decrypt(result));

    expect(decrypt).toBe(plaintext);
  });

  it("should encrypt and decrypt correctly when there is space and other characters", () => {
    const affineCipher = new TextAffineCipher(5, 3);
    const plaintext = "Hello World!!123";

    const result = affineCipher.encrypt(encodeString(plaintext));
    const decrypt = decodeString(affineCipher.decrypt(result));

    expect(decrypt).toBe("helloworld");
  });

  it("shpuld throw an exception", () => {
    expect(() => {
      new TextAffineCipher(2, 3);
    }).toThrow("Key m should be prime relative to 26");
  });
});
