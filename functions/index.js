const functions = require('firebase-functions');
const speech = require('@google-cloud/speech');


exports.transcribe = functions.https.onCall((data,context)=>{
    

    const client = new speech.SpeechClient();
    const gcsUri = data.file;
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
    };

    const request = {
        config: config,
        audio: audio,
    };

    async function time() {
        const [operation] = await client.longRunningRecognize(request);
        const [response] = await operation.promise();
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        return transcription;
    }

    time().then((transcription) => {
            console.log(transcription)
            return `${transcription}`
        })
        .catch(console.log(err))
  
})
    


