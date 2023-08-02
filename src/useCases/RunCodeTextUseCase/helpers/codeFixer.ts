import { ChatGptService } from "../../../infra/chatGptService/chatGptService";

export class CodeFixer {
  private chatGptService: ChatGptService;

  constructor(
    private error: string,
    private codeText: string
  ) {
    this.error = error;
    this.codeText = codeText;
    this.chatGptService = new ChatGptService(this.error, this.codeText);
  }

  async fixCode(): Promise<string> {
    return this.chatGptService.executeFixCode();
  }
}