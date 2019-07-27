
var bucketName = 'transribebucket';
var keyName = 'hello_world.txt'; //mp3 file name change to
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

  var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'}; //body should be .mp3 file
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
