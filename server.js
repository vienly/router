'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

const Router = require('./lib/router');

let router = new Router('/api');

router.get('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}');
  res.end();
});


http.createServer(router.route()).listen(port, () => console.log(`server up on port ${port}`));
