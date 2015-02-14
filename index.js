var express = require('express');
var multer = require('multer');
var fs = require('fs');
var server = express();
var FILES = process.env.FILES || __dirname + '/uploads';
server.use(multer({ dest: FILES }));
// get list of files
server.get('/files', function(req, res){
  fs.readdir(FILES, function(err, files){
    if (err) return sendStatus(400);
    res.send(files.filter(function(file){
      return file.indexOf('.') > 0;
    }));
  });
});

// handle uploaded files
server.post('/files', function(req, res){
  if (!req.files.file)
    return res.sendStatus(500);
  var uploaded = [];
  for (var key in req.files) {
    uploaded.push({ 
      field: key, 
      original: req.files[key].originalname, 
      name: req.files[key].name 
    });
  }
  res.send({uploaded: uploaded});
});

server.get('/', function(req, res){
  res.send('~');
});

// serving static files
server.use('/files', express.static(FILES));

module.exports = function(){
  return server;
}
