'use strict';

const http = require('http');

module.exports = function(req){
  return new Promise(function (resolve, reject) {
    if (http.METHODS.indexOf(req.method) > -1){
      req.body = '';
      req.on('data', function (data) {
        req.body += data.toString();
      });

      req.on('end', function () {
        try {
          req.body = JSON.parse(req.body);
          resolve();
        } catch(err) {
          reject(err);
        }
      });
      return;
    }
    resolve();
  });
};
