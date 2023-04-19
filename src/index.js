const { server } = require('./server');

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3001;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
