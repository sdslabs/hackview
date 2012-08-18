var express=require('express'),
    app = express.createServer(),
    sharejs = require('share');

var options = {db: {type: 'none'}};

sharejs.server.attach(app, options);
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.listen(8000);
console.log('App running on port 8000');
var webRTC = require('webrtc.io').listen(app);

require('./rtc.js')(webRTC);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});