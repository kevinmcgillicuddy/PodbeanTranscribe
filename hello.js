let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');
var request = require('request');
var bucketName = 'transribebucketkm';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

parser.parseURL('https://bridgetown.podbean.com/feed.xml', (err, feed) =>
  request(feed.items[0].enclosure.url, (err, response) =>
    uploadFileToS3(response, feed.items[0].title + '.mp3', (data) => transcribeAudio())));

const uploadFileToS3 = (file, fileName, callback) => {
  s3.upload({ Bucket: bucketName, Key: fileName, Body: file }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully uploaded data to " + bucketName );
      callback(data);
    }
  });

}

const transcribeAudio = () => {

}
//function transribeS3 ())