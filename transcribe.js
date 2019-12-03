//dependancies

let Parser = require('rss-parser');
var request = require('request-promise');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();

class Transcribtion {
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



let scribe = new Transcribtion('transcribebucketkm', 'transcribebucketkm-out', 'https://bridgetown.podbean.com/feed.xml')

scribe.file().then((res) => {
  return res
}).then((res) => {
  scribe.download(res.url)
  return downloadedFile
}).then((repo)=>{
  scribe.upload(repo)
}).catch((err)=>{
  console.log(err)
})



//  parser.parseURL('https://bridgetown.podbean.com/feed.xml', function (err, feed) {
//      var requestSettings = {
//      method: 'GET',
//      url: feed.items[0].enclosure.url,
//      encoding: null}; //request puts body response as string by default
//      var title = feed.items[0].title.toString().replace(/\s/g, '') + ".mp3"
//      var mediafileuri= "http://s3.amazonaws.com/transcribebucketkm/" + title
//      console.log(err)
//        request(requestSettings,function (err, response, body){
//          console.log(err)
//              s3.upload({ Bucket: bucketName, Key: title, Body: body},function(err,data){
//                transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: mediafileuri}, MediaFormat: "mp3", TranscriptionJobName: title, OutputBucketName: bucketNameOut},function(err){
//                  console.log(err)
//                });
//              });
//        });
//     });