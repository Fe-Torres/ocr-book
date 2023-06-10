export class MapperText {
  static executeMapper(text): string {
    text = text.toLowerCase();
    console.log(text);
    let result = this.mapperConsole(text);
    result = this.mapperUpperCaseWords(result);

    return result;
  }

  static mapperConsole(text: string): string {
    const rgx_replace = /console.\ /gi;
    const rgx_log = /log /gi;
    const rgx_replace_lower = /console.\log /gi;

    let result = text.replace(rgx_replace, 'console.');
    result = result.replace(rgx_log, 'log');
    result = result.replace(/end| end /gi, '} ');
    result = result.replace(rgx_replace_lower, 'console.log');
    return result;
  }
  static mapperUpperCaseWords(text: string): string {
    const rgx_replace = /var /gi;
    let result = text.replace(rgx_replace, 'var ');
    return result;
  }
}
