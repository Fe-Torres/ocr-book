import 'dotenv/config'
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision'
import { ApiKeyCredentials } from '@azure/ms-rest-js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sleep = require('util').promisify(setTimeout)

export async function computerVision (imageBuffer: Buffer) {
  const key = process.env.OCR_KEY
  const endpoint = process.env.OCR_ENDPOINT

  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
    endpoint
  )

  const printedResult = await readTextfromImg(
    computerVisionClient,
    imageBuffer
  )

  const textParsed = parserText(printedResult)

  return textParsed
}

async function readTextfromImg (client, url) {
  let result = await client.readInStream(url)
  const operation = result.operationLocation.split('/').slice(-1)[0]

  while (result.status !== 'succeeded') {
    await sleep(1000)
    result = await client.getReadResult(operation)
  }

  return result.analyzeResult.readResults
}

function parserText (readResults) {
  let text_result = ''
  for (const page in readResults) {
    const result = readResults[page]
    if (result.lines.length) {
      for (const line of result.lines) {
        const phrase = line.words.map((w) => w.text).join(' ')
        text_result = text_result + ' ' + phrase
      }
    } else {
      throw new Error('No recognized text.')
    }
  }

  return text_result
}
