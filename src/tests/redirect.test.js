const { redirect } = require('../redirect.js');

describe('redirect', () => {
  test('should set the response headers and redirect to the specified URL', () => {
    const res = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    const redirectUrl = 'https://example.com';
    redirect(res, redirectUrl);
    expect(res.writeHead).toHaveBeenCalledWith(307, {
      Location: redirectUrl,
      'Cache-Control':
        'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache',
    });
    expect(res.end).toHaveBeenCalled();
  });

  test('should set the response headers and redirect to a different URL', () => {
    const res = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    const redirectUrl = 'https://google.com';
    redirect(res, redirectUrl);
    expect(res.writeHead).toHaveBeenCalledWith(307, {
      Location: redirectUrl,
      'Cache-Control':
        'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache',
    });
    expect(res.end).toHaveBeenCalled();
  });
});
