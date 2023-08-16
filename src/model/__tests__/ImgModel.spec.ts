import { ImgModel } from "../ImgModel";

describe("ImgModel", () => {
  const validBase64Image = "data:image/jpeg;base64,/9j/4AAQSkZJRg...";
  const invalidBase64Image = "data:image/doc;base64,/9j/4AAQSkZJRg...";

  describe("isValidImageFormat", () => {
    it("deve retornar true para formatos de imagem válidos", () => {
      const imgModel = new ImgModel(validBase64Image);
      expect(imgModel.isValidImageFormat()).toBe(true);
    });

    it("deve retornar false para formatos de imagem inválidos", () => {
      const imgModel = new ImgModel(invalidBase64Image);
      expect(imgModel.isValidImageFormat()).toBe(false);
    });
  });

  describe("getImageBuffer", () => {
    it("deve retornar um buffer de imagem válido", () => {
      const imgModel = new ImgModel(validBase64Image);
      const imageBuffer = imgModel.getImageBuffer();
      expect(Buffer.isBuffer(imageBuffer)).toBe(true);
      expect(imageBuffer.length).toBeGreaterThan(0);
    });
  });
});
