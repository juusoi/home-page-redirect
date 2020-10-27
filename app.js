const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3001;
const weekend_url = 'https://en.wikipedia.org/wiki/2020_in_heavy_metal_music';
const random_wiki_url = 'https://en.wikipedia.org/wiki/Special:Random';
const xkcd_url = 'https://xkcd.com/';
const what_if_url = 'https://what-if.xkcd.com/';
var day;

const server = http.createServer((req, res) => {
  const newDay = parseInt(url.parse(req.url,true).query.day);
  //console.log(newDay);
  if (isNaN(newDay)) {
    day = new Date().getDay();
  } else {
    day = newDay;
  }
  switch (day) {
    case 1: 
      var redirect_url = xkcd_url;
      break;
    case 2:
      var redirect_url = what_if_url;
      break;
    case 3:
      var redirect_url = random_wiki_url;
      break;
    case 4:
    case 5:
      var redirect_url = weekend_url;
      break;
    case 6:
    case 0:
    default:
      var redirect_url = 'http://www.google.fi';
  }
  res.writeHead(307,{'Location': redirect_url, 'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache'});
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
