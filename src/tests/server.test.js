const http = require('http');
const request = require('supertest');
const { redirect } = require('../redirect.js');
const { server } = require('../server.js');

const PORT = process.env.PORT || 3002;
const WEEKEND_URL = 'https://en.wikipedia.org/wiki/2024_in_heavy_metal_music';
const RANDOM_WIKI_URL = 'https://en.wikipedia.org/wiki/Special:Random';
const XKCD_URL = 'https://xkcd.com/';
const DEFAULT_URL = 'https://hs.fi';

describe('redirect', () => {
  test('should set the response headers and redirect to the expected URL', () => {
    const res = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    const redirect_url = 'https://example.com';
    redirect(res, redirect_url);
    expect(res.writeHead).toHaveBeenCalledWith(307, {
      Location: redirect_url,
      'Cache-Control':
        'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache',
    });
    expect(res.end).toHaveBeenCalled();
  });
});

describe('GET /', () => {
  let test_server;

  beforeAll(() => {
    test_server = http.createServer(server);
    test_server.listen(PORT);
  });

  afterAll(() => {
    test_server.close();
  });

  test('should respond with 307 and redirect to URL according to weekday', async () => {
    const today = new Date().getDay();
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
    const expectedUrl = getExpectedUrl(today);
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(307);
    expect(response.header.location).toBe(expectedUrl);
  });

  test('should redirect to xkcd.com on Monday and Tuesday', async () => {
    const response1 = await request(server).get('/?day=1');
    expect(response1.statusCode).toBe(307);
    expect(response1.header.location).toBe(XKCD_URL);

    const response2 = await request(server).get('/?day=2');
    expect(response2.statusCode).toBe(307);
    expect(response2.header.location).toBe(XKCD_URL);
  });

  test('should redirect to hs.fi on Wednesday', async () => {
    const response = await request(server).get('/?day=3');
    expect(response.statusCode).toBe(307);
    expect(response.header.location).toBe(DEFAULT_URL);
  });

  test('should redirect to 2024 heavy metal music Wikipedia page on Thursday and Friday', async () => {
    const response1 = await request(server).get('/?day=4');
    expect(response1.statusCode).toBe(307);
    expect(response1.header.location).toBe(WEEKEND_URL);

    const response2 = await request(server).get('/?day=5');
    expect(response2.statusCode).toBe(307);
    expect(response2.header.location).toBe(WEEKEND_URL);
  });

  test('should redirect to random Wikipedia article on Saturday and Sunday', async () => {
    const response1 = await request(server).get('/?day=6');
    expect(response1.statusCode).toBe(307);
    expect(response1.header.location).toMatch(
      /https:\/\/en\.wikipedia\.org\/wiki\/[A-Za-z0-9_%]+/
    );

    const response2 = await request(server).get('/?day=0');
    expect(response2.statusCode).toBe(307);
    expect(response2.header.location).toMatch(
      /https:\/\/en\.wikipedia\.org\/wiki\/[A-Za-z0-9_%]+/
    );
  });

  test('should respond with 400 for invalid day parameter', async () => {
    const response1 = await request(server).get('/?day=7');
    expect(response1.statusCode).toBe(400);
    expect(response1.text).toBe('Error: Invalid day');

    const response2 = await request(server).get('/?day=foo');
    expect(response2.statusCode).toBe(400);
    expect(response2.text).toBe('Error: Invalid day');
  });

  test('should respond with 400 for missing day parameter', async () => {
    const response = await request(server).get('/?day=');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Error: Invalid day');
  });

  test('should respond with 307 with invalid query string', async () => {
    const response1 = await request(server).get('/?foo=bar');
    expect(response1.statusCode).toBe(307);
  });
});
