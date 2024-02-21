import TextAffineCipher from "@/lib/cipher/AffineCipher";
import { decodeString, encodeString } from "@/lib/encoder/Encoder";
import { generateKey } from "@/lib/keygen/AffineCipherKeygen";

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

  it("should encrypt and decrypt correctly", () => {
    const affineCipher = new TextAffineCipher(1, 2);
    const plaintext = "z";

    const result = affineCipher.encrypt(encodeString(plaintext));
    const decrypt = decodeString(affineCipher.decrypt(result));

    expect(decrypt).toBe(plaintext);
  });

  it("should encrypt back and decrypt correctly", () => {
    const affineCipher = new TextAffineCipher(1, -2);
    const plaintext = "a";

    const result = affineCipher.encrypt(encodeString(plaintext));
    const decrypt = decodeString(affineCipher.decrypt(result));

    expect(decrypt).toBe(plaintext);
  });

  it("shpuld throw an exception", () => {
    expect(() => {
      new TextAffineCipher(2, 3);
    }).toThrow("Key m should be prime relative to 26");
  });
});

describe("Test Affine Keygen", () => {
  it("should generate a key with m=5 and b=3", () => {
    const affineCipher = generateKey("m=5, b=3");
    expect(affineCipher).toStrictEqual({ m: 5, b: 3 });
  });

  it("should generate a key with m=7 and b=3", () => {
    const affineCipher = generateKey("b=3 m=7");
    expect(affineCipher).toStrictEqual({ m: 7, b: 3 });
  });
});
