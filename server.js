var express=require('express'),
    app = express.createServer(),
    sharejs = require('share'),
    sharejsOptions={db:{type:'none'}};

var env = process.env.NODE_ENV;

//if we were provided redis options, use them for persistence
//the if case is for developers not using redis
if(process.env.redis_port){
	sharejsOptions.db= {
		type: 'redis',
		prefix: '',
		port: process.env.redis_port,
		auth: process.env.redis_auth || null
	}
};

sharejs.server.attach(app, sharejsOptions);//attach to express

if (env !== 'production')
  app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname+"/public/favicon.ico"));
app.use(express.cookieParser());
app.use(express.session({secret:"SuperSecretSessionKey"}));

//heroku support
var port = process.env.PORT || 8000;
app.listen(port);
console.log('App running on port : '+port);

//webRTC Stuff
var webRTC = require('webrtc.io').listen(app);
require('./rtc.js')(webRTC);


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

/** Create a new random room */
app.get('/join',function(req,res){
  var roomName=req.query.nickname.split('@')[1];
  if(!roomName)
    roomName=getRandomRoom();
  console.log(req.query.nickname.split('@'));
  var nickName = req.query.nickname.split('@')[0];
  req.session.nick = nickName;
  res.redirect('/room/'+roomName);
});

var getRandomRoom = function(){
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}