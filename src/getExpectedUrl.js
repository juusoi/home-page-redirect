const WEEKEND_URL = 'https://en.wikipedia.org/wiki/2023_in_heavy_metal_music';
const RANDOM_WIKI_URL = 'https://en.wikipedia.org/wiki/Special:Random';
const XKCD_URL = 'https://xkcd.com/';
const DEFAULT_URL = 'https://hs.fi';

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

module.exports = { getExpectedUrl };
