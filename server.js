var simple = require('./');
var PORT = process.env.PORT || 3000;
simple().listen(PORT, function(err) {
  console.log('~>', PORT);
});
