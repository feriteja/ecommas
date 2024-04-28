import imageCompression from "compressorjs";

const compressImage = (file: File) => {
  return new Promise((resolve, reject) => {
    new imageCompression(file, {
      maxWidth: 800, // Adjust the max width as per your requirement
      maxHeight: 600, // Adjust the max height as per your requirement
      quality: 0.6, // Adjust the quality (0 to 1) as per your requirement
      success: (compressedFile) => {
        resolve(compressedFile);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
export default compressImage;
