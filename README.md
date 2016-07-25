#My Simple Router (as an exercise, don't actually use it)

### Install the npm package from terminal
```
npm i --S vien-simple-router
```

### Require in the http module
```javascript
const http = require('http')
```

### Require the router module
```javascript
const Router = require('vien-simple-router')
```

### Construct a new Router object with a root path
```javascript
let router = new Router('/api');
```

### Define the routes
```javascript
router.get('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}');
  res.end();
});
```

### Start and tell the server to listen to a specific port
```javascript
http.createServer(router.route()).listen(port)
```
