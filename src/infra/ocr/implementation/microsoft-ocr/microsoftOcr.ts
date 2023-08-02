import { IOcr } from "../../interfaces/ocrInterface";
import ComputerVisionService from "./helpers/computerVision";

export class MicrosoftOcr implements IOcr {
  private computerVisionService: ComputerVisionService;

  constructor () {
    this.computerVisionService = new ComputerVisionService();
  }

  async readImage(imageBuffer: Buffer): Promise<string> {
    try {
      const resultText = await this.computerVisionService.readTextFromImage(
        imageBuffer
      );
      return resultText;
    } catch (error) {
      const errorMessage =
        error?.body?.error?.message ||
        "An error occurred during OCR processing.";
      throw new Error(errorMessage);
    }
  }
}
