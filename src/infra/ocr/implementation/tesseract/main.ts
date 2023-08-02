import { createWorker } from "tesseract.js";
import { IOcr } from "../../interfaces/ocrInterface";

export class TesseractOcr implements IOcr {
  async readImage(image: Buffer) {
    const worker = await createWorker();

    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(image);
    await worker.terminate();

    return text;
  }
}
