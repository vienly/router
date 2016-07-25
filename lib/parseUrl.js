'use strict';

const url = require('url');
const queryString = require('querystring');

// async parse url
module.exports = function(req) {
  return new Promise(function(resolve) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    resolve();
  });
};
