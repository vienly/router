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

  this.handleError = (req, res) => {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('that page does not exist');
    res.end();
  };
};

// route methods
http.METHODS.forEach((method) => {
  Router.prototype[method.toLowerCase()] = function(endpoint, callback) {
    this.routes[method][path.join(this.root, endpoint)] = callback;
  };
});

Router.prototype.route = function() {
  // return (req, res) => {
  //   if (this.routes[req.method][req.url] instanceof Function) {
  //     this.routes[req.method][req.url](req, res);
  //   } else {
  //     this.handleError(req, res);
  //   }
  // };

  const routes = this.routes;
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseBody(req)
    ]).then(() => {
      if(this.routes[req.method][req.url.pathname] instanceof Function) {
        return routes[req.method][req.url.pathname](req, res);
      }

      response(404, 'path not found')(res);
    }).catch(function(err) {
      console.log(err.msg);
      response(400, 'bad request')(res);
    });
  };
};
