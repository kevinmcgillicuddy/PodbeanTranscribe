let Parser = require('rss-parser');
let fs = require('fs');
var request = require('request');
var bucketName = 'transcribebucketkm';
var AWS = require('aws-sdk');
let parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();


parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
  request(feed.items[0].enclosure.url), function (err, response, file )  {
        s3.upload({ Bucket: bucketName, Key: "testperm3.mp3", Body: file }, function (err, data) {
            transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: data.Location}, MediaFormat: "mp3", TranscriptionJobName: "testing"}, function (err, data){
                              //console.log(data);           
                     });
            
  });
  });
});
//issue is that when I upload file it is corrupt format