#My Simple Router (as an exercise, don't actually use it)

### Install the npm package from terminal
```
npm i --S vien-simple-router
```

### Instantiate an http server
```javascript
const http = require('http')
```

### Instantiate the router
```javascript
const Router = require('vien-simple-router')
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

### Tell the server to listen to a specific port
```javascript
http.createServer(router.route()).listen(port)
```
