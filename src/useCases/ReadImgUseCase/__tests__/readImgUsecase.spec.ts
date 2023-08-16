import { ServiceError } from "../../../main/errors/ServiceError";
import { ReadImgUseCase } from "../readImgUseCase";
import { MockOcr } from "./Mock/MockOcr";

describe("ReadImgUseCase", () => {
  let readImgUseCase: ReadImgUseCase;

  beforeEach(() => {
    const mockOcr = new MockOcr();
    readImgUseCase = new ReadImgUseCase(mockOcr);
    jest.clearAllMocks();
  });

  describe("execute", () => {
    it("deve retornar o texto extraído da imagem", async () => {
      const imageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRg...";
      const result = await readImgUseCase.execute(imageBase64);
      expect(result).toBe("console.log(\"Any code\")");
    });

    it("deve lançar um erro ServiceError para formatos de imagem inválidos", async () => {
      const invalidImageBase64 = "data:image/doc;base64,/9j/4AAQSkZJRg...";
      expect(readImgUseCase.execute(invalidImageBase64)).rejects.toThrow(
        ServiceError
      );
    });
  });
});
