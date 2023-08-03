import { ActionLog, Logger } from "../../../main/logs/Loger";
import { IMapperText } from "../../../model/interfaces/IMapperText";

export class MapperText implements IMapperText {
  executeMapper(text: string): string {
    Logger.processMessage("executeMapper method", ActionLog.INITIAL, {
      initialText: text,
    });
    const mappedText = this.mapperConsole(text);
    const finalText = this.mapperUpperCaseWords(mappedText);
    Logger.processMessage("executeMapper method", ActionLog.END, { finalText });
    return finalText;
  }

  private mapperConsole(text: string): string {
    const rgxReplace = /console.\ /gi;
    const rgxLog = /log /gi;
    const rgxReplaceLower = /console.\log /gi;

    let result = text.replace(rgxReplace, "console.");
    result = result.replace(rgxLog, "log");
    result = result.replace(rgxReplaceLower, "console.log");
    return result;
  }

  private mapperUpperCaseWords(text: string): string {
    const rgxNativeWords =
      // eslint-disable-next-line max-len
      /\b(console\.log|var|let|const|function|if|else|for|while|switch|case|default|break|continue|return|new|typeof|instanceof)\b/gi;
    return text.replace(rgxNativeWords, (match) => match.toLowerCase());
  }
}
