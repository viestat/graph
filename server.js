var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static('./node_modules/'));

app.listen(port, function () {
  console.log('listening on port', port);
});
