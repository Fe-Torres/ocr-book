import { ServiceError } from "../../../main/errors/ServiceError";
import { FileManager } from "../helpers/fileManager";

describe("FileManager", () => {
  let fileManager: FileManager;

  beforeEach(() => {
    fileManager = new FileManager();
  });

  it("deve criar e executar um arquivo corretamente", async () => {
    const codeText = "console.log(\"Hello, World!\");";
    await fileManager.createFile(codeText);
    const result = await fileManager.executeFile();
    expect(result).toBe("Hello, World!\n");
  });

  it("deve lançar uma exceção ao executar um arquivo inexistente", async () => {
    await expect(fileManager.executeFile()).rejects.toThrow(ServiceError);
  });
});
