const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3001;

const weekend_url = 'https://en.wikipedia.org/wiki/2021_in_heavy_metal_music';
const random_wiki_url = 'https://en.wikipedia.org/wiki/Special:Random';
const xkcd_url = 'https://xkcd.com/';
const what_if_url = 'https://what-if.xkcd.com/';
const default_url = 'https://hs.fi'

const server = http.createServer((req, res) => {
  const newDay = parseInt(url.parse(req.url, true).query.day);
  let day = (isNaN(newDay)) ? new Date().getDay() : newDay;
  switch (day) {
    case 1:
      redirect(res, xkcd_url);
    case 2:
      redirect(res, what_if_url);
    case 3:
      redirect(res, random_wiki_url);
    case 4:
    case 5:
      redirect(res, weekend_url);
    case 6:
    case 0:
    default:
      redirect(res, default_url);
  }
});

function redirect(res, redirect_url) {
  res.writeHead(307, { 'Location': redirect_url, 'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache' });
  res.end();
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
