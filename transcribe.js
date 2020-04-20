// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
//const gcsUri = 'gs://bucketkevin01/node.mp3';
const gcsUri = 'gs://bucketkevin01/node.mp3';
const encoding = 'm4a';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const audio = {
  uri: gcsUri,
  // content: fs.readFileSync('node.mp3').toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

async function  time () {
// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
const [operation] = await client.longRunningRecognize(request);
// Get a Promise representation of the final result of the job
const [response] = await operation.promise();
const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');
// console.log(`Transcription: ${transcription}`);
return transcription;
}

time()
.then(transcription => console.log(transcription))
.catch()

