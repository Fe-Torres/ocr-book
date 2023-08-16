import {
  ICodeFixer,
  ICodeFixerResponse,
} from "../../../../model/interfaces/ICodeFixer";

export class MockCodeFixer implements ICodeFixer {
  async fixCode(codeWithError: string): Promise<ICodeFixerResponse> {
    if (codeWithError == "return with error") {
      return { correctedCode: "conxole.log(\"Code fixed\")" };
    }

    return { correctedCode: "console.log(\"Code fixed\")" };
  }
}
