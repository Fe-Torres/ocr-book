export class MapperText {
  static executeMapper(text: string): string {
    const lowerCaseText = text.toLowerCase();
    const mappedText = this.mapperConsole(lowerCaseText);
    const finalText = this.mapperUpperCaseWords(mappedText);
    return finalText;
  }

  private static mapperConsole(text: string): string {
    const rgxReplace = /console.\ /gi;
    const rgxLog = /log /gi;
    const rgxReplaceLower = /console.\log /gi;

    let result = text.replace(rgxReplace, 'console.');
    result = result.replace(rgxLog, 'log');
    result = result.replace(/end| end /gi, '} ');
    result = result.replace(rgxReplaceLower, 'console.log');
    return result;
  }

  private static mapperUpperCaseWords(text: string): string {
    const rgxReplace = /var /gi;
    const result = text.replace(rgxReplace, 'var ');
    return result;
  }
}
