export class MapperText {
  constructor(private text: string) {}
  executeMapper(): string {
    this.text = this.text.toLowerCase();
    console.log(this.text);
    let result = this.mapperConsole(this.text);
    result = this.mapperUpperCaseWords(result);

    return result;
  }
  mapperConsole(text: string): string {
    const rgx_replace = /console.\ /gi;
    const rgx_log = /log /gi;
    const rgx_replace_lower = /console.\log /gi;

    let result = text.replace(rgx_replace, 'console.');
    result = result.replace(rgx_log, 'log');
    result = result.replace(/end| end /gi, '} ');
    result = result.replace(rgx_replace_lower, 'console.log');
    return result;
  }
  mapperUpperCaseWords(text: string): string {
    const rgx_replace = /var /gi;
    let result = text.replace(rgx_replace, 'var ');
    return result;
  }
}
