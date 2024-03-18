const fs = require('fs');
const CryptoJS = require('crypto-js');

// Encryption function
async function encryptImage(imageData, key) {
    // Convert image data to base64 string
    const imageDataBase64 = Buffer.from(imageData).toString('base64');

    // Encrypt image data using AES algorithm
    const encryptedData = CryptoJS.AES.encrypt(imageDataBase64, key).toString();

    return encryptedData;
}

// Decryption function
async function decryptImage(encryptedImageData, key) {
    // Decrypt image data
    const decryptedData = CryptoJS.AES.decrypt(encryptedImageData, key).toString(CryptoJS.enc.Utf8);

    // Convert decrypted data from base64 to buffer
    const decryptedImageBuffer = Buffer.from(decryptedData, 'base64');

    return decryptedImageBuffer;
}

// Function to save encrypted image to a file
async function saveEncryptedImageToFile(encryptedImageData, filePath) {
    // Write encrypted data to a file
    await fs.promises.writeFile(filePath, encryptedImageData);
    console.log('Encrypted image saved to:', filePath);
}

// Function to save decrypted image to a file
async function saveDecryptedImageToFile(decryptedImageBuffer, filePath) {
    // Write decrypted data to a file
    await fs.promises.writeFile(filePath, decryptedImageBuffer);
    console.log('Decrypted image saved to:', filePath);
}

// Example usage
async function main() {
    const encryptionKey = 'encryption_key'; // Replace 'encryption_key' with your encryption key

    // Read image data from a file
    const imageFilePath = "C:/Users/KAPIL MAYWADE/Pictures/Screenshots/Screenshot (162).png"; // Replace 'path_to_your_image.jpg' with the actual file path
    const imageBufferFromFile = await fs.promises.readFile(imageFilePath);

    // Encrypt image
    const encryptedImageDataFromFile = await encryptImage(imageBufferFromFile, encryptionKey);

    // Save encrypted image to a file
    const encryptedImageFilePath = 'C:/blockchainproject/Image Encryption/New folder/newimage.enc'; // Specify the path where you want to save the encrypted image
    await saveEncryptedImageToFile(encryptedImageDataFromFile, encryptedImageFilePath);
    console.log('Encryption done.');

    // Decrypt image
    const decryptedImageBuffer = await decryptImage(encryptedImageDataFromFile, encryptionKey);

    // Save decrypted image to a file
    const decryptedImageFilePath = 'C:/blockchainproject/Image Encryption/New folder/decryptnew image.jpg'; // Specify the path where you want to save the decrypted image
    await saveDecryptedImageToFile(decryptedImageBuffer, decryptedImageFilePath);
    console.log('Decryption done.');
}

main().catch(console.error);
