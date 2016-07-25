'use strict';

const http = require('http');

module.exports = function(req){
  return new Promise(function (resolve, reject) {
    // only care about the body of the request if put, post, or delete
    if (['PUT', 'POST'].indexOf(req.method) > -1){
      req.body = '';
      req.on('data', function (data) {
        req.body += data.toString();
      });

      req.on('end', function () {
        try {
          req.body = JSON.parse(req.body);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      return;
    }
    // if not put, post, or delete, just pass the resolve with null for the then block
    resolve();
  });
};
