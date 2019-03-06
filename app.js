const http = require('http');

const hostname = 'localhost';
const port = 3001;
const weekend_url = 'https://en.wikipedia.org/wiki/2019_in_heavy_metal_music';
const random_wiki_url = 'https://en.wikipedia.org/wiki/Special:Random';
const xkcd_url = 'https://xkcd.com/';
const what_if_url = 'https://what-if.xkcd.com/';

const server = http.createServer((req, res) => {
  switch (new Date().getDay()) {
    case 0:
      var url = xkcd_url;
      break;
    case 1: 
      var url = what_if_url;
      break;
    case 2:
    case 3:
      var url = random_wiki_url;
      break;
    case 4:
    case 5:
    case 6:
      var url = weekend_url;
      break;
    default:
      var url = 'http://www.google.fi';
  }
  res.writeHead(307,{'Location': url, 'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache'});
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
