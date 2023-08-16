import { OpenAIApi, Configuration } from "openai";
import {
  ICodeFixerResponse,
  ICodeFixer,
} from "../../model/interfaces/ICodeFixer";
import { Logger } from "../../main/logs/Loger";
import { ServiceError } from "../../main/errors/ServiceError";

export class ChatGptService implements ICodeFixer {
  private configuration: Configuration;
  private openAi: OpenAIApi;
  private modelId: string;

  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.modelId = "gpt-3.5-turbo";
    this.openAi = new OpenAIApi(this.configuration);
  }

  async fixCode(codeWithError: string): Promise<ICodeFixerResponse> {
    try {
      Logger.initialProcessMessage("ChatGpt - Fix code");
      const prompt = this.buildPrompt(codeWithError);

      const result = await this.openAi.createChatCompletion({
        model: this.modelId,
        messages: [{ role: "user", content: prompt }],
      });
      const correctedCode = result.data.choices[0].message.content;
      Logger.endProcessMessage("ChatGpt - Fix code");

      return { correctedCode };
    } catch (err) {
      throw new ServiceError(err.message);
    }
  }
  private buildPrompt(codeText: string): string {
    return `Fala Chatinho Gepetê, recebi um erro ao executar um arquivo javascript com esse código:
      Código: ${codeText}.
      Realize a correção e me retorne somente o código javascript corrigido.
      Observação: Não escreva nada além do código corrigido.`;
  }
}
