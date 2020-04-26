// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');



const client = new speech.SpeechClient();


const gcsUri = 'gs://bucketkevin01/node.mp3';
const encoding = 'mp3';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const audio = {
  uri: gcsUri,
};

const request = {
  config: config,
  audio: audio,
};

async function  time () {

const [operation] = await client.longRunningRecognize(request);
const [response] = await operation.promise();
const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');
return transcription;
}

time()
.then(transcription => console.log(transcription))
.catch()

