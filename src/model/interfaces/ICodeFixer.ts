export interface ICodeFixerResponse {
  correctedCode: string;
}

export interface ICodeFixer {
  fixCode(
    _codeWithError: string,
    _errorMessage: string
  ): Promise<ICodeFixerResponse>;
}
