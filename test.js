//dependancies
var request = require('request-promise-native');
const fs = require('fs');
let fileStream = fs.createWriteStream('node.mp3');
var requestSettings = { method: 'GET', url: 'https://mcdn.podbean.com/mf/download/b9arbt/12-22-2019.mp3', encoding: null };
request(requestSettings, function (err, res, body) {
    console.log(body)
}).pipe(fileStream);