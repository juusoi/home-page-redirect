const http = require('http');
const url = require('url');
const { redirect } = require('./redirect');

const WEEKEND_URL = 'https://en.wikipedia.org/wiki/2023_in_heavy_metal_music';
const RANDOM_WIKI_URL = 'https://en.wikipedia.org/wiki/Special:Random';
const XKCD_URL = 'https://xkcd.com/';
const DEFAULT_URL = 'https://hs.fi';
const ALLOWED_DAYS = [0, 1, 2, 3, 4, 5, 6];

const server = http.createServer((req, res) => {
  const newDay = parseInt(url.parse(req.url, true).query.day);
  if (isNaN(newDay)) {
    if (req.url.includes('day=')) {
      errorResponse(res);
      return;
    }
  } else if (!ALLOWED_DAYS.includes(newDay)) {
    errorResponse(res);
    return;
  }
  function errorResponse(res) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Error: Invalid day');
    return;
  }

  function getExpectedUrl(day) {
    switch (day) {
      case 1:
      case 2:
        return XKCD_URL;
      case 3:
        return DEFAULT_URL;
      case 4:
      case 5:
        return WEEKEND_URL;
      case 6:
      case 0:
      default:
        return RANDOM_WIKI_URL;
    }
  }
  const day = ALLOWED_DAYS.includes(newDay) ? newDay : new Date().getDay();
  const expectedUrl = getExpectedUrl(day);
  redirect(res, expectedUrl);
});

module.exports = { server };
