let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');
var request = require('request');
var bucketName = 'transribebucketkm';
var keyName = 'hello_world'; 
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

 // var params = {Bucket: bucketName, Key: keyName, Body: FileData}; 

(async () => {
 
  let feed = await parser.parseURL('https://bridgetown.podbean.com/feed.xml');
  const title=feed.items[0].title;
  const DownloadLink=feed.items[0].enclosure.url
  console.log(DownloadLink);

  var file = request(DownloadLink).pipe(fs.createWriteStream ('file.mp3'))
  var upload = fs.createReadStream(file);

    s3.putObject({Bucket: bucketName, Key: title, Body: upload}, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
  });//final