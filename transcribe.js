//dependancies
//
let Parser = require('rss-parser');
var request = require('request-promise');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();
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
    let mediafile = "http://s3.amazonaws.com/" + bucketName + "/" + url
    return { url: url, title: title, mediafile: mediafile };
  }
  async download(url) {
    var requestSettings = { method: 'GET', url: url, encoding: null };
    let downloadedFile = await request(requestSettings)
    return downloadedFile
  }
  async upload(body,bucketName) {
    return s3.upload({ Bucket: bucketName, Key: this.title, Body: body }).promise(); 
}
  async convert(mediafile,title,bucketOutput){
    return transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: mediafile}, MediaFormat: "mp3", TranscriptionJobName: title, OutputBucketName: bucketOutput}).promise();
  }
}
let scribe = new Transcription('transcribebucketkm', 'transcribebucketkm-out', 'https://bridgetown.podbean.com/feed.xml')

scribe.mp3Info().then((response) => {
  return response
}).then((res) => {
  return scribe.download(res.url)
}).then((repo)=>{
  scribe.upload(repo)
}).then(()=>{
  scribe.convert();
}).catch((err)=>{
  console.log("Error",err)
})



