function redirect(res, redirect_url) {
  res.writeHead(307, {
    Location: redirect_url,
    "Cache-Control":
      "no-store, no-cache, must-revalidate, post-check=0, pre-check=0-cache",
  });
  res.end();
}

module.exports = { redirect };
