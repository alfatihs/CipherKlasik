import { TextHillCipher } from "@/lib/cipher/HillCipher";
import { decodeString, encodeString } from "@/lib/encoder/Encoder";

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
