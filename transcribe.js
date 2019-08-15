let Parser = require('rss-parser');
let fs = require('fs');
const http = require('http');
var request = require('request');
var bucketName = 'transcribebucketkm';
var AWS = require('aws-sdk');
let parser = new Parser();
var s3 = new AWS.S3();
var transcribeservice = new AWS.TranscribeService();
var audioFile = fs.createWriteStream('audioFile.mp3');



var download = parser.parseURL('https://bridgetown.podbean.com/feed.xml');

   var request = http.request(download,function(response){
    response.pipe(audioFile);
    File.on('finish',function(){
      s3.upload({ Bucket: bucketName, Key: "mp3.mp3", Body: audioFile });
    });    
   });
    

   /*
    (feed.items[0].enclosure.url),function(err,response,body){
      fs.writeFile(mp3.mp3, data,function(){
        s3.upload({ Bucket: bucketName, Key: "mp3.mp3", Body: "mp3.mp3" }, function (err, data) {
      }
    
    
       
          const up = await transcribeservice.startTranscriptionJob({LanguageCode: "en-US", Media:{MediaFileUri: data.Location}, MediaFormat: "mp3", TranscriptionJobName: "testing"}
              
                  );
                  
            }
          );
  
      }
    });
  */