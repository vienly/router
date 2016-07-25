const http = require('http');
const path = require('path');
const parseUrl = require('url').parse;

let Router = module.exports = (rootPath) => {
  this.root = rootPath;
  this.routes = {};

  http.METHODS.forEach((method) => {
    this.routes[method] = {};
  });

  this.handleError = (req, res) => {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('that page does not exist');
    res.end();
  };
};

http.METHODS.forEach((method) => {
  Router.prototype[method.toLowerCase()] = (destination, callback) => {
    this.routes[method][path.join(this.root, destination)] = callback;
  };
});

// able to handle multiple callbacks maybe
Router.prototype.route = () => {
  return (req, res) => {

    let routes = this.routes[req.method][req.url];

    if(routes && routes.length > 0) {
      routes.reduce((curr, next) => {
        curr.then(() => {
          let nextCb = next(req, res);
          if (nextCb instanceof Promise) {
            return nextCb;
          }
          return Promise.resolve(nextCb);
        });
      }, Promise.resolve())
        .catch(() => {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.write('500 code');
          res.end();
        });
    } else {
      this.handleError(req, res);
    }
  };
};
