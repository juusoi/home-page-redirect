function errorResponse(res) {
  try {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Error: Invalid day');
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${e.message}`);
  }
}

module.exports = { errorResponse };
