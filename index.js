exports.handler = async (event, context) => {

      var Parser = require('rss-parser');
var request = require('request');
var AWS = require('aws-sdk');
var bucketName = 'transcribebucketkm';
var bucketNameOut = 'transcribebucketkm-out';

var parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();

AWS.config.update({region:'us-east-1'});
var datetime = new Date().toISOString().slice(0,10) + ".mp3";
console.log(datetime)
var mediafileuri= "http://s3.amazonaws.com/transcribebucketkm/" + datetime


parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
             request({ method: 'GET', url: feed.items[0].enclosure.url, encoding: null},function (err, response, body){ 
            s3.upload({ Bucket: bucketName, Key: datetime, Body: body},function(err,data){
                  transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: mediafileuri}, MediaFormat: "mp3", TranscriptionJobName: datetime, OutputBucketName: bucketNameOut});
            });

      });
});
       

}