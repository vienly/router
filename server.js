'use strict';

const http = require('http');
const Router = require('./lib/router');

let router = new Router('/api');

router.get('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}');
  res.end();
});

http.createServer(router.route()).listen(3000, () => console.log('server up'));
