let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');
var request = require('request');
var bucketName = 'transcribebucketkm';
var AWS = require('aws-sdk');
var transcribeservice = new AWS.TranscribeService();
var s3 = new AWS.S3();

parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
  request(feed.items[0].enclosure.url, function (err,response,file) {
    console.log(response.body)
    s3.upload({ Bucket: bucketName, Key: "testperm2.mp3", Body: file }, function (err, data) {
            transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: data.Location}, MediaFormat: "mp3", TranscriptionJobName: "testing"}, function (err, data){
                              //console.log(data);           
                     });
            
  });
  });
});