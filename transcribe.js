let Parser = require('rss-parser');
let fs = require('fs');
var request = require('request');
var bucketName = 'transcribebucketkm';
var AWS = require('aws-sdk');
let parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();
var audioFile = fs.createWriteStream('audioFile.mp3');

parser.parseURL('https://bridgetown.podbean.com/feed.xml', async function (err, feed) {
    const res = await request(feed.items[0].enclosure.url).pipe(audioFile)
      if (res.err) {console.log("error")}
      else {
       s3.upload({ Bucket: bucketName, Key: "testperm5.mp3", Body: "audioFile.mp3" }, async function (err, data) {
          const up = await transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: data.Location}, MediaFormat: "mp3", TranscriptionJobName: "testing"}
              
                  );
                  
            }
          );
  
      }
    });
  