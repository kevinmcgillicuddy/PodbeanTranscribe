//dependancies
let Parser = require('rss-parser');
var request = require('request');
var AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'us-east-1' });

var transcribeservice = new AWS.TranscribeService();

class Transcription {
  constructor(bucketName, bucketOutput, URL) {
    this.bucketName = bucketName;
    this.bucketOutput = bucketOutput;
    this.URL = URL;
  }
  async mp3Info() {
    let parser = new Parser();
    let file = await parser.parseURL(this.URL)
    let title = file.items[0].title.toString().replace(/\s/g, '') + ".mp3"
    let url = file.items[0].enclosure.url;
    let mediafile = "http://s3.amazonaws.com/" + this.bucketName + "/" + url
    return { url: url, title: title, mediafile: mediafile };
  }
  // async download(url) {
  //   var requestSettings = { method: 'GET', url: url,encoding:null };
  //   let downloadedFile = await request(requestSettings)
  //   return downloadedFile
  // }
  async upload(url) {
    let fileStream = fs.createWriteStream('node.mp3');
    var requestSettings = { method: 'GET', url: url,encoding:null };
    request(requestSettings,()=>{
      var s3 = new AWS.S3();
      s3.putObkect({ Bucket: this.bucketName, Key: "title", Body: fileStream, ContentType: "application/octet-stream"})
    
    }).pipe(fileStream)
    
  }
}
let scribe = new Transcription('transcribebucketkm', 'transcribebucketkm-out', 'https://bridgetown.podbean.com/feed.xml')

scribe.mp3Info().then((response) => {
   scribe.upload(response.url)
}).catch((err) => {
  console.log("Error", err)
})



















//var s3 = new AWS.S3();
// var params = {
//   Bucket: "transcribebucketkm", 
//   Key: "title"
//  };
//  s3.getObject(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);           // successful response
   
//  });

