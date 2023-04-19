function redirect(res, redirect_url) {
  try {
    res.writeHead(307, {
      Location: redirect_url,
      'Cache-Control':
        'no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache',
    });
    res.end();
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${e.message}`);
  }
}

module.exports = { redirect };
