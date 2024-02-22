import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Flex,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { CipherType } from "@/lib/CipherType";
import {
  decryptFileApi,
  decryptStringApi,
  encryptFileApi,
  encryptStringApi,
} from "@/api/api";

export default function Homepage() {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [encryptionType, setEncryptionType] = useState(
    CipherType.VigenereStandard
  );
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleEncrypt = async () => {
    try {
      if (inputType === "text") {
        const result = await encryptStringApi(encryptionType, key, inputValue);
        setResult(result);
      } else if (file != null) {
        await encryptFileApi(encryptionType, key, file);
      }
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "Error",
        description: `${(e as any).message}`,
      });
    }
  };

  const handleDecrypt = async () => {
    try {
      if (inputType === "text") {
        const result = await decryptStringApi(encryptionType, key, inputValue);
        setResult(result);
      } else if (file != null) {
        await decryptFileApi(encryptionType, key, file);
      }
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "Error",
        description: `${(e as any).message}`,
      });
    }
  };

  const handleClear = () => {
    setInputType("text");
    setInputValue("");
    setKey("");
    setEncryptionType(CipherType.VigenereStandard);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading mb={4}>Classic Cipher</Heading>
        <Text mb={4}>by: Azmi Alfatih Shalahuddin 13520158</Text>
        <Text mb={4}>and Bayu Samudra 13520128</Text>

        <FormControl mb={4}>
          <FormLabel>Cipher Type</FormLabel>
          <Select
            value={encryptionType}
            onChange={(e) => setEncryptionType(e.target.value as CipherType)}
          >
            <option value={CipherType.VigenereStandard}>
              Vigenere (Standard)
            </option>
            <option value={CipherType.VigenereExtended}>
              Vigenere (Extended)
            </option>
            <option value={CipherType.VigenereAutokey}>
              Vigenere (Auto-Key)
            </option>
            <option value={CipherType.Playfair}>Playfair</option>
            <option value={CipherType.Affine}>Affine</option>
            <option value={CipherType.Hill}>Hill</option>
            <option value={CipherType.SuperEncryption}>Super</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Input Type</FormLabel>
          <Select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </Select>
        </FormControl>

        {inputType === "text" ? (
          <FormControl mb={4}>
            <FormLabel>Input Text</FormLabel>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </FormControl>
        ) : (
          <FormControl mb={4}>
            <FormLabel>Upload File</FormLabel>
            <Input
              type="file"
              onChange={(el) =>
                setFile(
                  el.currentTarget.files ? el.currentTarget.files[0] : null
                )
              }
            />
          </FormControl>
        )}

        <FormControl mb={4}>
          <FormLabel>Key</FormLabel>
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </FormControl>

        <Flex>
          <Button colorScheme="blue" mr={2} onClick={handleEncrypt}>
            Encrypt
          </Button>
          <Button colorScheme="blue" mr={2} onClick={handleDecrypt}>
            Decrypt
          </Button>
          <Button colorScheme="gray" onClick={handleClear}>
            Clear
          </Button>
        </Flex>
        <Box mt={5}>
          <Heading as="h2" size="md">
            Hasil
          </Heading>
          <Text>{result}</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
