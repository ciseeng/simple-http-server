var server = require('../');
var assert = require('assert');
var request = require('supertest');

// todo remove all files inside UPLOAD

describe('/files', function(){
  var id;
  it ('response to GET /files', function(done){
    request(server())
      .get('/files')
      .expect(200)
      .end(done);
  });
  it ('response to POST /files', function(done){
    request(server())
      .post('/files')
      .attach('file', __dirname + '/files.js')
      .expect(200)
      .end(done);
  });
  it ('response to GET /files', function(done){
    request(server())
      .get('/files')
      .expect(200)
      .end(function(err, res){
        assert.equal(res.body.length, 1);
        id = res.body[0];
        done(err);
      });
  });
  it ('response to GET /files/:id', function(done){
    request(server())
      .get('/files/' + id)
      .expect(200)
      .end(done);
  });
});

