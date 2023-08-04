export interface ICodeFixerResponse {
  correctedCode: string;
}

export interface ICodeFixer {
  fixCode(_codeWithError: string): Promise<ICodeFixerResponse>;
}
