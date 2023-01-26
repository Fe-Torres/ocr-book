/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const util = require('util')
const { exec } = require('child_process')
const execProm = util.promisify(exec)
const { unlink } = require('fs').promises

export async function executeFile (fileName) {
  let result
  const prettyCommand = `js-beautify -r ${fileName}`
  const executeCommand = `node ${fileName}`
  try {
    result = await execProm(prettyCommand)
    result = await execProm(executeCommand)
  } catch (err) {
    result = err
  }
  removeFile(fileName)
  if (Error[Symbol.hasInstance](result)) { throw new Error(result.stderr) }
  return result.stdout
}

function removeFile (fileName) {
  unlink(fileName, (err) => {
    if (err) throw err
  })
}
