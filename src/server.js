const http = require('http');
const url = require('url');
const { redirect } = require('./redirect');
const { errorResponse } = require('./errorResponse');
const { getExpectedUrl } = require('./getExpectedUrl');

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
  const day = ALLOWED_DAYS.includes(newDay) ? newDay : new Date().getDay();
  const expectedUrl = getExpectedUrl(day);
  redirect(res, expectedUrl);
});

module.exports = { server };
