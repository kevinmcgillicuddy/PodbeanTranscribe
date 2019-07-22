 
var fs = require('fs'),
xml2js = require('xml2js');
var util = require('util');
var parser = new xml2js.Parser();

fs.readFile(__dirname + '/feed.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        //console.log(util.inspect(result, false, null))
        JSON.stringify(result);
        console.log(result);
    });
});
  

/*
need to grab podcasts from RSS 
    (https://bridgetown.podbean.com/feed.xml)
COmpare dates
Download latest
Upload to S3
Create Job
Get JSON
Save as file to OneDrive *Flow?
*/
