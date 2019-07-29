
var bucketName = 'transribebucket';
var keyName = 'hello_world'; //mp3 file name change to
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

  //var params = {Bucket: bucketName, Key: keyName, Body: FileData}; //body should be .mp3 file

  fs.readFile(file.mp3, function(err,FileData) {
    s3.putObject({Bucket: bucketName, Key: keyName, Body: FileData}, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
  });