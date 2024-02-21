import { TextHillCipher } from "@/lib/cipher/HillCipher";
import { SuperEncryption } from "@/lib/cipher/SuperEncryptionCipher";
import { TranspositionCipher } from "@/lib/cipher/TranspositionCipher";
import { decodeString, encodeString } from "@/lib/encoder/Encoder";

describe("Super Encryption Test", () => {
  it("should encrypt and decrypt a string", () => {
    // Arrange
    const superEncryption = new SuperEncryption([
      new TextHillCipher([
        [7, 8, 12],
        [2, 8, 1],
        [5, 7, 2],
      ]),
      new TranspositionCipher(5),
    ]);

    const data = "helloworld";
    const expected = data;

    // Act
    const encrypted = superEncryption.encrypt(encodeString(data));
    const encryptedString = decodeString(encrypted);

    expect(encryptedString).not.toBe(expected);

    const decrypted = superEncryption.decrypt(encrypted);

    // Assert
    expect(decodeString(decrypted)).toBe(expected);
  });
});
