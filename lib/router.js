'use strict';
const http = require('http');
const path = require('path');

let Router = module.exports = function(rootPath) {
  this.root = rootPath;
  this.routes = {};

  //keys
  http.METHODS.forEach((method) => {
    this.routes[method] = {};
  });
};

// route methods
http.METHODS.forEach((method) => {
  Router.prototype[method.toLowerCase()] = function(endpoint, callback) {
    this.routes[method][path.join(this.root, endpoint)] = callback;
  };
});

Router.prototype.route = function() {
  const routes = this.routes; // avoid scoping issues
  return (req, res) => {
    Promise.all([
      Router.parseUrl(req),
      Router.parseBody(req)
    ]).then(() => {
      if(routes[req.method][req.url.pathname] instanceof Function) {
        return routes[req.method][req.url.pathname](req, res);
      }
      Router.response(404, 'path not found')(res);
    }).catch((err) => {
      console.log(err);
      Router.response(400, 'bad request')(res);
    });
  };
};

// attach lib functions onto the export to use in external packages
// visible above via hoisting
Router.response = require('./response');
Router.parseBody = require('./parseBody');
Router.parseUrl = require('./parseUrl');
