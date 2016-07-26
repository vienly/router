'use strict';

const http = require('http');
const Router = require('./lib/router');
// const response = Router.response;

let routes = new Router('/api');

routes.get('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}');
  res.end();
});

routes.patch('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('patch');
  res.end();
});

module.exports = http.createServer(routes.route()).listen(3000, () => {
  console.log('test server up at 3000');
});
