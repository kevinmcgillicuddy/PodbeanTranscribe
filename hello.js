let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');
var request = require('request');

(async () => {
 
  let feed = await parser.parseURL('https://bridgetown.podbean.com/feed.xml');
  const title=feed.items[0].title;
  const DownloadLink=feed.items[0].enclosure.url
  console.log(DownloadLink);

  
  var file = request(DownloadLink).pipe(fs.createWriteStream ('file.mp3'))


})();
