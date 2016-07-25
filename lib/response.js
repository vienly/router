'use strict';

module.exports = function(statusCode, data) {
  return function (res) {
    res.writeHead(statusCode, {
      'Content-Type': 'applciaiton/json'
    });

    res.write(JSON.stringify(data));
    res.end();
  };
};
