export interface IOcr {
  readImage(_imageBuffer: Buffer): Promise<string>;
}
