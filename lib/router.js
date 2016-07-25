'use strict';
const http = require('http');
const path = require('path');
const parseUrl = require('./parseUrl');
const parseBody = require('./parseBody');
const response = require('./response');

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
  const routes = this.routes;
  return (req, res) => {
    Promise.all([
      parseBody(req),
      parseUrl(req)
    ]).then(function() {
      if(routes[req.method][req.url.pathname] instanceof Function) {
        return routes[req.method][req.url.pathname](req, res);
      }
      response(404, 'path not found')(res);
    }).catch(function(err) {
      console.log(err);
      response(400, 'bad request')(res);
    });
  };
};
