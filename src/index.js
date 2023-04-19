const http = require("http");
const { server } = require("./server");

const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3001;

const app = http.createServer(server);

try {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
} catch (e) {
  console.log(e);
}
