const http = require('http');

const hostname = 'localhost';
const port = 3001;
const weekend_url = 'https://en.wikipedia.org/wiki/2019_in_heavy_metal_music';
const normal_url = 'https://en.wikipedia.org/wiki/Special:Random';
const cartoon_url = 'https://xkcd.com/'

const server = http.createServer((req, res) => {
  var now = new Date();
  if (now.getDay() < 1) {
    var url = weekend_url;
  }
  if (now.getDay() > 0) {
    var url = cartoon_url;
  }
  else {
    var url = normal_url;
  }
  res.writeHead(307,{Location: url});
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
