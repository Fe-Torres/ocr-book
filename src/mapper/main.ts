export class MapperText {
  constructor(private text: string) {}
  executeMapper(): string {
    const text = this.text;
    const result = this.mapperConsole(text);
    return result;
  }
  mapperConsole(text: string): string {
    const rgx_replace = /console. /gi;
    const rgx_log = /log /gi;

    let result = text.replace(rgx_replace, 'console.');
    result = result.replace(rgx_log, 'log');
    result = result.replace(/end| end /gi, '} ');
    return result;
  }
}
