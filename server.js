require('coffee-script');
var express=require('express'),
    app = express.createServer(),
    sharejs = require('share'),
	hat = require('hat').rack(32, 36);

var options = {db: {type: 'none'}};

sharejs.server.attach(app, options);

app.use(express.static(__dirname + '/public'));
app.listen(8000);

var webRTC = require('webrtc.io').listen(app);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});