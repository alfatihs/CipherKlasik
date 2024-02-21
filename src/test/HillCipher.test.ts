import { TextHillCipher } from "@/lib/cipher/HillCipher";
import { decodeString, encodeString } from "@/lib/encoder/Encoder";
import { generateKey } from "@/lib/keygen/HillCipherKeygen";

describe("Test hill cipher", () => {
  it("should able to encypt and decrypt back (9 chars)", () => {
    const hillCipher = new TextHillCipher([
      [6, 24, 1],
      [13, 16, 10],
      [20, 17, 15],
    ]);

    const plaintext = "kirimuang";
    const result = hillCipher.encrypt(encodeString(plaintext));
    const decrypt = decodeString(hillCipher.decrypt(result));

    expect(decrypt).toBe(plaintext);
  });

  it("should able to encypt and decrypt back (4 chars)", () => {
    const hillCipher = new TextHillCipher([
      [6, 24, 1],
      [13, 16, 10],
      [20, 17, 15],
    ]);

    const plaintext = "halo";
    const result = hillCipher.encrypt(encodeString(plaintext));
    const decrypt = decodeString(hillCipher.decrypt(result));

    expect(decrypt).toBe(plaintext);
  });
});

describe("Test hill cipher with keygen", () => {
  it("should able to generate a key variant 1", () => {
    const payload = `1 4 8
3 5 7
6 9 2`;

    const result = generateKey(payload);
    expect(result).toStrictEqual([
      [1, 4, 8],
      [3, 5, 7],
      [6, 9, 2],
    ]);
  });

  it("should able to generate a key variant 2", () => {
    const payload = `1 4 8 5
      3 5 7 2
      6 9 2 5
      1 2 3 4`;

    const result = generateKey(payload);
    expect(result).toStrictEqual([
      [1, 4, 8, 5],
      [3, 5, 7, 2],
      [6, 9, 2, 5],
      [1, 2, 3, 4],
    ]);
  });

  it("should able to generate a key variant 3", () => {
    const payload = `
      1 4 8 5
      3 5 7 2
      6 9 2 5
      1 2 3 4
    `;

    const result = generateKey(payload);
    expect(result).toStrictEqual([
      [1, 4, 8, 5],
      [3, 5, 7, 2],
      [6, 9, 2, 5],
      [1, 2, 3, 4],
    ]);
  });
});
