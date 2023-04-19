const http = require('http');
const url = require('url');
const { redirect } = require('./redirect');

const weekend_url = 'https://en.wikipedia.org/wiki/2023_in_heavy_metal_music';
const random_wiki_url = 'https://en.wikipedia.org/wiki/Special:Random';
const xkcd_url = 'https://xkcd.com/';
const default_url = 'https://hs.fi';
const ALLOWED_DAYS = [0, 1, 2, 3, 4, 5, 6];

const server = http.createServer((req, res) => {
  let newDay = parseInt(url.parse(req.url, true).query.day);
  if (isNaN(newDay)) {
    if (req.url.includes('day=')) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Invalid day');
      return;
    } else {
      newDay = new Date().getDay();
    }
  } else if (!ALLOWED_DAYS.includes(newDay)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Error: Invalid day');
    return;
  }
  let day = ALLOWED_DAYS.includes(newDay) ? newDay : new Date().getDay();
  switch (day) {
    case 1:
    case 2:
      redirect(res, xkcd_url);
      break;
    case 3:
      redirect(res, default_url);
      break;
    case 4:
    case 5:
      redirect(res, weekend_url);
      break;
    case 6:
    case 0:
    default:
      redirect(res, random_wiki_url);
  }
});

module.exports = { server };
