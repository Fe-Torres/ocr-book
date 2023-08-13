import { ServiceError } from "../../main/errors/ServiceError";
import { CodeTextModel } from "../CodeTextModel";

describe("CodeTextModel", () => {
  describe("Validando o código", () => {
    it("deve lançar um erro ServiceError para código potencialmente malicioso", () => {
      const maliciousCode = "require(\"fs\")";
      expect(() => new CodeTextModel(maliciousCode)).toThrow(ServiceError);
    });

    it("não deve lançar erro para código não malicioso", () => {
      const safeCode = "const x = 42;";
      expect(() => new CodeTextModel(safeCode)).not.toThrow(ServiceError);
    });
  });
});
