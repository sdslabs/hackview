var express=require('express'),
    app = express.createServer();

app.use(express.static(__dirname + '/public'));
app.listen(8000);
console.log('App running on port 8000');
var webRTC = require('webrtc.io').listen(app);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});