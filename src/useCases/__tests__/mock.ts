const extractedText = "Texto extraído da imagem";

const imgModelMock = {
  isValidImageFormat: jest.fn().mockReturnValue(true),
};
const ocrMock = {
  readImage: jest.fn().mockResolvedValue(extractedText),
};

export { imgModelMock, ocrMock, extractedText };
