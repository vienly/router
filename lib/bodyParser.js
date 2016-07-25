'use strict';

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    // req.body = '';
    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch(e) {
        reject(e);
      }
    });
  });
};
