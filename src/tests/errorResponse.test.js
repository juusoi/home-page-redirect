const { errorResponse } = require('../errorResponse.js');

describe('errorResponse', () => {
  test('should set the response headers and end the response with the error message', () => {
    const res = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    const errorMessage = 'Invalid day';
    errorResponse(res, errorMessage);
    expect(res.writeHead).toHaveBeenCalledWith(400, {
      'Content-Type': 'text/plain',
    });
    expect(res.end).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});
