import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import {
  ReadInStreamResponse,
  ReadOperationResult,
} from "@azure/cognitiveservices-computervision/esm/models";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { ServiceError } from "../../../../../main/errors/ServiceError";

class ComputerVisionService {
  private computerVisionClient: ComputerVisionClient;

  constructor() {
    const key: string | undefined = process.env.OCR_KEY;
    const endpoint: string | undefined = process.env.OCR_ENDPOINT;

    if (!key || !endpoint) {
      // Implementar o erro customizável
      throw new ServiceError(
        "OCR",
        "Missing OCR_KEY or OCR_ENDPOINT in the environment variables."
      );
    }

    const credentials = new ApiKeyCredentials({
      inHeader: { "Ocp-Apim-Subscription-Key": key },
    });
    this.computerVisionClient = new ComputerVisionClient(credentials, endpoint);
  }

  public async readTextFromImage(imageBuffer: Buffer): Promise<string> {
    const printedResult: ReadOperationResult = await this.readText(imageBuffer);
    const textParsed = this.parseText(printedResult);
    return textParsed;
  }

  private async readText(imageBuffer: Buffer): Promise<ReadOperationResult> {
    let resultReadInStream: ReadInStreamResponse =
      await this.computerVisionClient.readInStream(imageBuffer);
    const operation: string = resultReadInStream.operationLocation
      .split("/")
      .slice(-1)[0];

    let imageResponse: ReadOperationResult;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      imageResponse = await this.computerVisionClient.getReadResult(operation);
    } while (imageResponse.status !== "succeeded");

    return imageResponse;
  }

  private parseText(result: ReadOperationResult): string {
    const readResults = result.analyzeResult?.readResults;

    if (!readResults || readResults.length === 0) {
      throw new ServiceError("No recognized text.");
    }

    let textResult = "";

    for (const page of readResults) {
      if (page.lines && page.lines.length) {
        for (const line of page.lines) {
          const phrase: string =
            line.words?.map((word) => word.text).join(" ") ?? "";
          textResult += " " + phrase;
        }
      }
    }

    return textResult.trim();
  }
}

export default ComputerVisionService;
