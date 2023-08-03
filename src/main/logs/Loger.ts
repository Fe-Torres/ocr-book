/* eslint-disable no-unused-vars */
export class Logger {
  private static getTimestamp(): string {
    const date = new Date();
    return date.toISOString();
  }

  static log(message: string) {
    console.log(`[${this.getTimestamp()}] [LOG] ${message}`);
  }

  static warn(message: string) {
    console.warn(`[${this.getTimestamp()}] [WARN] ${message}`);
  }

  static info(message: string) {
    console.info(`[${this.getTimestamp()}] [INFO] ${message}`);
  }

  static error(message: string) {
    console.error(`[${this.getTimestamp()}] [ERROR] ${message}`);
  }

  static processMessage(
    processName: string,
    action: ActionLog,
    data?: unknown
  ) {
    console.info(
      `[${this.getTimestamp()}] [INFO] ${action} Process - ${processName}`
    );

    if (data) {
      const dataParsed = JSON.stringify(data);
      console.info(
        `[${this.getTimestamp()}] [INFO] ${processName} - Data: ${dataParsed}`
      );
    }
  }
}

export enum ActionLog {
  INITIAL = "Initial",
  END = "End",
}
