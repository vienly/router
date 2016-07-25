![cf](https://i.imgur.com/7v5ASc8.png) My Simple Router (as an exercise, don't actually use it)

# Install the npm package from terminal
```npm i --S vien-simple-router```

# Instantiate an http server
```const http = require('http')```

# Instantiate the router
```const Router = require('vien-simple-router')

# Define the routes
```router.get('/hello', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}');
  res.end();
});```

# Tell the server to listen to a specific port
```http.createServer(router.route()).listen(port)```
