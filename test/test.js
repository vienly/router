const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

var testServer = require('../testServer');

describe('testing route module', function(){

  after(function (done) {
    testServer.close(function() {
      done();
    });
  });

  describe('testing route', () => {
    it('GET /hello return hello world', (done) => {
      request('localhost:3000')
        .get('/api/hello')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200, '');
          expect(res.text).to.eql('{"msg": "hello world"}');
          done();
        });
    });
  });

  describe('testing route', () => {
    it('DELETE /api/badroute should respond with status code 404', (done) => {
      request('localhost:3000')
        .delete('/api/badroute')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('path not found');
          done();
        });
    });
  });

  describe('testing route', () => {
    it('POST /api/hello should respond with status code 400', (done) => {
      request('localhost:3000')
        .post('/api/hello')
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });
  });
});
