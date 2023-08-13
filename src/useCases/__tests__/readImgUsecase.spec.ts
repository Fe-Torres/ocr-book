import { IOcr } from "../../infra/ocr/interfaces/ocrInterface";
import { ServiceError } from "../../main/errors/ServiceError";
import { ReadImgUseCase } from "../ReadImgUseCase/readImgUseCase";
import { extractedText, ocrMock } from "./mock";

const mockOcr: IOcr = {
  readImage: jest.fn().mockResolvedValue(extractedText),
};

describe("ReadImgUseCase", () => {
  let readImgUseCase: ReadImgUseCase;

  beforeEach(() => {
    readImgUseCase = new ReadImgUseCase(mockOcr);
    jest.clearAllMocks();
  });

  describe("execute", () => {
    it("deve retornar o texto extraído da imagem", async () => {
      const imageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRg...";
      jest.spyOn(mockOcr, "readImage").mockImplementation(ocrMock.readImage);
      const result = await readImgUseCase.execute(imageBase64);
      expect(result).toBe(extractedText);
    });

    it("deve lançar um erro ServiceError para formatos de imagem inválidos", async () => {
      const invalidImageBase64 = "data:image/doc;base64,/9j/4AAQSkZJRg...";
      expect(readImgUseCase.execute(invalidImageBase64)).rejects.toThrow(
        ServiceError
      );
    });
  });
});
