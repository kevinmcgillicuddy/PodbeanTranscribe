 //dependancies
 
 let Parser = require('rss-parser');
 var request = require('request');
 var AWS = require('aws-sdk');
 AWS.config.update({region:'us-east-1'});
 var bucketName = 'transcribebucketkm';
 var bucketNameOut = 'transcribebucketkm-out';
 let parser = new Parser();
 var s3 = new AWS.S3();
 var transcribeservice = new AWS.TranscribeService();
 
 parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
     var requestSettings = {
     method: 'GET',
     url: feed.items[0].enclosure.url,
     encoding: null}; //request puts body response as string by default
     var title = feed.items[0].title.toString().replace(/\s/g, '') + ".mp3"
     var mediafileuri= "http://s3.amazonaws.com/transcribebucketkm/" + title
     console.log(err)
       request(requestSettings,function (err, response, body){
         console.log(err)
             s3.upload({ Bucket: bucketName, Key: title, Body: body},function(err,data){
               transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: mediafileuri}, MediaFormat: "mp3", TranscriptionJobName: title, OutputBucketName: bucketNameOut},function(err){
                 console.log(err)
               });
             });
       });
    });