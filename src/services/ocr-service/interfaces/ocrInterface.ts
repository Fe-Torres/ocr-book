export interface IOcr {
  readImage(imageBuffer: Buffer): Promise<string>;
}
