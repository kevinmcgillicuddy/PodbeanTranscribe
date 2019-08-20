let Parser = require('rss-parser');
let fs = require('fs');
var request = require('request');
var bucketName = 'transcribebucketkm';
var bucketNameOut = 'transcribebucketkm-out';
var AWS = require('aws-sdk');
let parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();
AWS.config.update({region:'us-east-1'});
var datetime = new Date();
var datetime = datetime.toISOString().slice(0,10) + ".mp3"
var mediafileuri= "http://s3.amazonaws.com/transcribebucketkm/" + datetime

parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
    var requestSettings = {
    method: 'GET',
    url: feed.items[0].enclosure.url,
    encoding: null}; //request puts body response as string by default
   request(requestSettings,function (err, response, body){
            s3.upload({ Bucket: bucketName, Key: datetime, Body: body},function(err,data){
              transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: mediafileuri}, MediaFormat: "mp3", TranscriptionJobName: datetime, OutputBucketName: bucketNameOut});
            });

      });
   });
       