const { getExpectedUrl } = require('../getExpectedUrl.js');

describe('getExpectedUrl', () => {
  test('should return the expected URL for each day', () => {
    expect(getExpectedUrl(1)).toBe('https://xkcd.com/');
    expect(getExpectedUrl(2)).toBe('https://xkcd.com/');
    expect(getExpectedUrl(3)).toBe('https://hs.fi');
    expect(getExpectedUrl(4)).toBe(
      'https://en.wikipedia.org/wiki/2023_in_heavy_metal_music'
    );
    expect(getExpectedUrl(5)).toBe(
      'https://en.wikipedia.org/wiki/2023_in_heavy_metal_music'
    );
    expect(getExpectedUrl(6)).toMatch(
      /https:\/\/en\.wikipedia\.org\/wiki\/[A-Za-z0-9_%]+/
    );
    expect(getExpectedUrl(0)).toMatch(
      /https:\/\/en\.wikipedia\.org\/wiki\/[A-Za-z0-9_%]+/
    );
  });
});
