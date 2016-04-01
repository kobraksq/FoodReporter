// Init express
var express = require('express');
var app = express();
app.get('/*', express.static('app'));
//Begin server at port 8080
app.listen(8080, function(){
  console.log('The server is ready on port 8080');
});
