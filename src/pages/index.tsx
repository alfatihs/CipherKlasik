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
} from "@chakra-ui/react";

export default function Homepage() {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [vigenereType, setVigenereType] = useState("encrypt");
  const [key, setKey] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleEncrypt = () => {
    // Add encryption logic here
    console.log("Encrypting...");
  };

  const handleDecrypt = () => {
    // Add decryption logic here
    console.log("Decrypting...");
  };

  const handleClear = () => {
    setInputType("text");
    setInputValue("");
    setVigenereType("vigenere");
    setKey("");
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
            value={vigenereType}
            onChange={(e) => setVigenereType(e.target.value)}
          >
            <option value="vigenere">Vigenere (Standard)</option>
            <option value="vigenere-extended">Vigenere (Extended)</option>
            <option value="vigenere-autokey">Vigenere (Auto-Key)</option>
            <option value="playfair">Playfair</option>
            <option value="affine">Affine</option>
            <option value="hill">Hill</option>
            <option value="super">Super</option>
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
            {/* Implement file uploader here */}
            <Input type="file" />
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
          <Button
            colorScheme="blue"
            mr={2}
            onClick={vigenereType === "encrypt" ? handleEncrypt : handleDecrypt}
          >
            Encrypt
          </Button>
          <Button
            colorScheme="blue"
            mr={2}
            onClick={vigenereType === "encrypt" ? handleEncrypt : handleDecrypt}
          >
            Decrypt
          </Button>
          <Button colorScheme="gray" onClick={handleClear}>
            Clear
          </Button>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
