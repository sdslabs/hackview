var express=require('express'),
    app = express.createServer(),
    sharejs = require('share');

var options = {db: {type: 'none'}};

sharejs.server.attach(app, options);
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8000;

app.listen(port);
console.log('App running on port'+port);
var webRTC = require('webrtc.io').listen(app);

require('./rtc.js')(webRTC);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
