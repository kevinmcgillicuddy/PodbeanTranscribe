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
  async file() {
    let parser = new Parser();
    let file = await parser.parseURL(this.URL)
    let title = file.items[0].title.toString().replace(/\s/g, '') + ".mp3"
    let url = file.items[0].enclosure.url;
    return { url: url, title: title };
  }
  async download(url) {
    var requestSettings = { method: 'GET', url: url, encoding: null };
    let downloadedFile = await request(requestSettings)
    return downloadedFile
  }
  async upload(body) {
    s3.upload({ Bucket: this.bucketName, Key: 'title', Body: body })
    console.log('uploading')
}
}
let scribe = new Transcription('transcribebucketkm', 'transcribebucketkm-out', 'https://bridgetown.podbean.com/feed.xml')
scribe.file().then((res) => {
  console.log('promise1 resolved', res)
  return res
}).then((res) => {
  return scribe.download(res.url)
}).then((repo)=>{
  scribe.upload(repo)
}).catch((err)=>{
  console.log(err)
})



