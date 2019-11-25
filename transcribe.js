//dependancies

let Parser = require('rss-parser');
var request = require('request-promise-native');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
// var bucketName = 'transcribebucketkm';
// var bucketNameOut = 'transcribebucketkm-out';
let parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();

class Transcribtion {
  constructor(bucketName, bucketOutput, URL) {
    this.bucketName = bucketName;
    this.bucketOutput = bucketOutput;
    this.URL = URL;
  }
  async file() {
    let file = await parser.parseURL(this.URL)
    let title = file.items[0].title.toString().replace(/\s/g, '') + ".mp3"
    
    return { file: file, title: title };


  }
  async download(file) {
    var requestSettings = { method: 'GET', url: file, encoding: null };
    await request(requestSettings)
  }

  async upload() {
    s3.upload({ Bucket: bucketName, Key: title, Body: body }, function (err, data) {
      var mediafileuri = "http://s3.amazonaws.com/transcribebucketkm/" + title
      transcribeservice.startTranscriptionJob({ LanguageCode: "en-US", Media: { MediaFileUri: mediafileuri }, MediaFormat: "mp3", TranscriptionJobName: title, OutputBucketName: bucketNameOut })
    })

  }
}



let scribe = new Transcribtion('transcribekm', 'transcribeout', 'https://bridgetown.podbean.com/feed.xml')
scribe.file().then((blah)=>{
  console.log(blah.title)
})

