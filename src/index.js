const { server } = require('./server');

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 3001;

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
