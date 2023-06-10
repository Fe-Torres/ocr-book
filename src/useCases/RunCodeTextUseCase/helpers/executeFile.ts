import util from 'util';
import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';

const { unlink } = fsPromises;
const execProm = util.promisify(exec);

export async function executeFile(fileName: string): Promise<string> {
  let result: { stdout: string; stderr: string };
  const prettyCommand = `js-beautify -r ${fileName}`;
  const executeCommand = `node ${fileName}`;
  try {
    result = await execProm(prettyCommand);
    result = await execProm(executeCommand);
  } catch (err) {
    result = err;
  }
  // await removeFile(fileName);
  if (result instanceof Error) {
    throw new Error(result.stderr);
  }
  return result.stdout;
}

async function removeFile(fileName: string): Promise<void> {
  try {
    await unlink(fileName);
  } catch (err) {
    throw err;
  }
}
