import { IOcr } from "../../../../infra/ocr/interfaces/ocrInterface";

export class MockOcr implements IOcr {
  async readImage(_imageBuffer: Buffer): Promise<string> {
    return "console.log(\"Any code\")";
  }
}
