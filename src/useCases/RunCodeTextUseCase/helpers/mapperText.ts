export class MapperText {
  static executeMapper(text: string): string {
    const mappedText = this.mapperConsole(text);
    const finalText = this.mapperUpperCaseWords(mappedText);
    return finalText;
  }

  private static mapperConsole(text: string): string {
    const rgxReplace = /console.\ /gi;
    const rgxLog = /log /gi;
    const rgxReplaceLower = /console.\log /gi;

    let result = text.replace(rgxReplace, 'console.');
    result = result.replace(rgxLog, 'log');
    result = result.replace(rgxReplaceLower, 'console.log');
    return result;
  }

  private static mapperUpperCaseWords(text: string): string {
    const rgxNativeWords = /\b(console\.log|var|let|const|function|if|else|for|while|switch|case|default|break|continue|return|new|typeof|instanceof)\b/gi;
    return text.replace(rgxNativeWords, (match) => match.toLowerCase());
  }
}
