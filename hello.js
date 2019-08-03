let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');
var request = require('request');
var bucketName = 'transcribebucketkm';
var AWS = require('aws-sdk');
var transcribeservice = new AWS.TranscribeService();
var s3 = new AWS.S3();



parser.parseURL('https://bridgetown.podbean.com/feed.xml', (err, feed) => {
  request(feed.items[0].enclosure.url,  (err,response,file) => {
    uploadFileToS3(file, feed.items[0].title + '.mp3',output)
      console.log(output);
  })
  });
    
const uploadFileToS3 = (file, fileName, callback) => {
    s3.upload({ Bucket: bucketName, Key: fileName, Body: file }, (err, data) => {
        if (err) {
            console.log(err)
          } else {
            console.log("Successfully uploaded data to " + bucketName );
            callback(data);
          }
  });
};

/*
const uploadFileToTranscribe = (a,b,c,d,e,f) => {
  transcribeservice.startTranscriptionJob({LanguageCode: a, Media:{MediaFileUri:b}, MediaFormat: c, }, (err, data) => {
        if (err) console.log(err, err.stack); 
        else     
        console.log(data);           

  });
