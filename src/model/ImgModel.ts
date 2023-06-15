import { extname } from 'path';

export class ImgModel {
  constructor(private imageBase64: string) {}

  isValidImageFormat(): boolean {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

    const fileExtension = this.getFileExtension();
    return validExtensions.includes(fileExtension.toLowerCase());
  }

  getImageBuffer(): Buffer {
    return Buffer.from(this.getBase64Data(), 'base64');
  }

  private getFileExtension(): string {
    const match = /data:image\/([a-zA-Z+]+);/.exec(this.imageBase64);
    return match ? `.${match[1]}` : '';
  }

  private getBase64Data(): string {
    const base64Data = this.imageBase64.split(';base64,').pop() || '';
    return base64Data;
  }
}
