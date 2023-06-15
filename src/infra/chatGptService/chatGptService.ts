export class ChatGptService {
  constructor(private error: string, private codeText: string) {
    // Inicialização da classe ChatGptService
  }

  async executeFixCode(): Promise<string> {
    // Lógica para enviar o erro para a inteligência do ChatGptService e obter a correção do código
    const fixedCode = await this.getFixedCodeFromChatGpt();
    return fixedCode;
  }

  private async getFixedCodeFromChatGpt(): Promise<string> {
    // Suponha que a resposta do ChatGptService seja um objeto com a propriedade "fixedCode"
    const response = {
      fixedCode: `console.log("Fake: Esse código foi corrigido no retry pelo ChatGpt")`
    };

    const fixedCode = response.fixedCode;
    return fixedCode;
  }

  private getInputSchema(): string {
    const inputSchema = `Recebi o seguinte erro ao executar um arquivo javascript:
                            Error: ${this.error} ao executar o seguinte código:
                            Código: ${this.codeText}.
                            Realize a correção e me retorne o fixedCode corrigido nesse formato
                            {"fixedCode": "exemplo do código corrigido"}
                            `;
    return inputSchema;
  }
}
