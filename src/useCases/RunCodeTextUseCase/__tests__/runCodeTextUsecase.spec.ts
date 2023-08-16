import { RunCodeTextUseCase } from "../runCodeTextUseCase";
import { MapperText } from "../helpers/mapperText";
import { FileManager } from "../helpers/fileManager";
import { MockCodeFixer } from "./Mock/CodeFixerMock";
import { ServiceError } from "../../../main/errors/ServiceError";

describe("RunCodeTextUseCase", () => {
  let runCodeTextUseCase: RunCodeTextUseCase;

  beforeEach(() => {
    const mapperText = new MapperText();
    const fileManager = new FileManager();
    const mockCodeFixer = new MockCodeFixer();
    runCodeTextUseCase = new RunCodeTextUseCase(
      mapperText,
      fileManager,
      mockCodeFixer
    );
  });

  describe("execute", () => {
    it("deve executar com sucesso o código e retornar o resultado", async () => {
      const inputCode = "console.log(\"Hello World\");";
      const expectedResult = "Hello World\n";

      const result: string = await runCodeTextUseCase.execute(inputCode);

      expect(result).toBeDefined();
      expect(result).toBe(expectedResult);
    });

    it("deve executar novamente após a correção de código com falha e retornar o resultado corrigido", async () => {
      const inputCodeWithError = "conxole.log(\"Code fixed\");";
      const expectedResult = "Code fixed\n";

      const result = await runCodeTextUseCase.execute(inputCodeWithError);

      expect(result).toBe(expectedResult);
    });

    it("deve capturar e tratar um erro lançado e executar a correção de código com falha novamente", async () => {
      const inputCodeWithError = "return with error";

      await expect(async () => {
        await runCodeTextUseCase.execute(inputCodeWithError);
      }).rejects.toThrow(ServiceError);
    });
  });
});
