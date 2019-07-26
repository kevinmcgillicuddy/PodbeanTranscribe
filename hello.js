const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

let xml_string = fs.readFileSync("feed.xml", "utf8");

parser.parseString(xml_string, function(error, result) {
    if(error === null) {
        console.log(result.rss.ATTR.version);
    }
    else {
        console.log(error);
    }
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


parser.parseString(data, function (err, result) {
        //console.log(util.inspect(result, false, null))
        JSON.stringify(result);
        console.log(result);
    
*/
