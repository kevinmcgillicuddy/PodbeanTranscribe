let Parser = require('rss-parser');
let fs = require('fs');
var request = require('request');
var bucketName = 'transcribebucketkm';
var AWS = require('aws-sdk');
let parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();
//var audioFile = fs.createWriteStream('audioFile.mp3');


parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
  console.log(err);
  var requestSettings = {
    method: 'GET',
    url: feed.items[0].enclosure.url,
    encoding: null //request puts body response as string by default
};
   request(requestSettings,function (err, response, body){
     console.log(err);
      fs.writeFile("./p3.mp3",body,function(err){
        console.log(err);
        var someDataStream = fs.createReadStream('p3.mp3'); //maybe knox can make this easier so not writing than reading?
        s3.upload({ Bucket: "transcribebucketkm", Key: "File.mp3", Body: someDataStream},function(err,data){
            console.log(err);
            transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: data.Location}, MediaFormat: "mp3", TranscriptionJobName: "testing"});
            });

      });
   });
  });
      