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
