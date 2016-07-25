'use strict';

const http = require('http');
const path = require('path');
const parseUrl = require('url').parse;

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
  Router.prototype[method.toLowerCase()] = function(destination, callback) {
    this.routes[method][path.join(this.root, destination)] = callback;
  };
});

Router.prototype.route = function() {
  return (req, res) => {
    if (this.routes[req.method][req.url] instanceof Function) {
      this.routes[req.method][req.url](req, res);
    } else {
      this.handleError(req, res);
    }
  };
};
