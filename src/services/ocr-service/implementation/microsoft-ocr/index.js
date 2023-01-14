'use strict';


const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const key = '2b19ba67f816419fb060ce2a7882ba60';
const endpoint = 'https://poc-ocr-book.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

export async function computerVision(img) {

  // const printedTextSampleURL = 'https://lh3.googleusercontent.com/gYgcqb9lP1I7oVxeoQRbrMmJbL-GoUkC8F25GRNW3TISOLf2Z9Xq0lJqWstbUwq_3Np0n_i2Ap5IstDHUTDYubcrcmsYw_IyjioodxUdruCeffvBEovkUeGnLMTL76cM8IeHqItzFuRUkxr0p8LEVo-1FELqZ5CzAL3Im5qjn4jyPyF5EA-YbV5QQSRBcJDej37uk-C3DH4P8tm0wt7wq336YuCmEWyFSzBNh5TRhsHW842yZjhd0cz905q4--ZKrWXH7-46RTagAoAMCRtmOWu0qwHRBZXjrH1HfdkXPAibO5vuwJjqIH9UvLaH2l6ts-8XR_aKtMhHYuK4dZPTu2EbhgGOU-UHjP-WF59ZTPocYu-sJnBGz1CWD6hv_Sl0FZLbiRIAEl3jVHaAeoTjXgGFsWpO8VOAp2l6cfxXPSrVrmp3zd30JD8rphf2HKPHB2q45MBETGIXCqJg59BInimT4echrH7kL9TDfwpmLreSZkpvX0bIV3Q2FZk9515kkkYKE8benmAbXjquXMIlc_Z44awKmaGr2gTF5-fuKCI2UcPkeaf25XE0CGch4c5uNAwqtGKcET0GdcqxN02d9sG4HPO_ERvZqSBayUi0rlp4iA96fjOE8ll76-3UcPzbL_qLdUVuRkeiD_vlrGCYbnFzjL1Nv_0c0f7ikaGbUO-XUE4OYn0gjwanDSm_oaHs57QiHa4KjooRxk1Qam_nk1qEdqWjOVgRrci41O56y5DH87NB_IkYrKKo_A-lw0y9MdFb2L3iHSTNxxE5aSnH40cyTbDGMs3ZuGEuaPeUDQXfTiEvXlDuabUyO0Y7kmfY18JoO1xOjHQvH6CQhx4AxuivfffOWLT8qOJlpDHFHiKFZK7dC4d60nUEukZYvahBY2Ty_fHv5uPT35ECA1suB8GNOVol0WGXpUZfjEuido6gQSqn-w33f3RUXQMcGu_OablYjyapy63Bo-o54G1yUxtljLKlBSQI3mAPCf2xdWdrwd7kh9IKhzWYMPm6RLSM786w1BuDqXhv5ntIEiLIMnkmpzy1L1FlprQjaF9PyX7KI7YH30u_nD2AeYHrwQ=w1600-h388-no?authuser=0';
  // Recognize text in printed image from a URL
  //console.log('Read printed text from URL...', printedTextSampleURL.split('/').pop());
  const printedResult = await readTextFromURL(computerVisionClient, img);
  const text_result = printRecText(printedResult);
  return text_result

}

async function readTextFromURL(client, url) {
  let result = await client.read(url);
  let operation = result.operationLocation.split('/').slice(-1)[0];

  while (result.status !== "succeeded") {
    console.log(result.status)
    await sleep(1000);
    result = await client.getReadResult(operation);
  }
  return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
}

function printRecText(readResults) {
  console.log('Recognized text:');
  let text_result = ""
  for (const page in readResults) {
    if (readResults.length > 1) {
      console.log(`==== Page: ${page}`);
    }
    const result = readResults[page];
    if (result.lines.length) {
      for (const line of result.lines) {
        const phrase = line.words.map(w => w.text).join(' ')
        text_result = text_result + " " + phrase
        console.log(phrase);
      }
    }
    else { console.log('No recognized text.'); }
  }
  return text_result
}