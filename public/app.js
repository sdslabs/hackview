//app.js is the main app loader
//its like controller of the main app
var App=(function(){
  
  function _init(){
    //attach some events at the start	
    $('#newRoom').click(function(){
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var string_length = 8;
      var randomstring = '';
      for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
      }
      window.location.hash = randomstring;
      window.location.reload();
    });
    Hangout.init();//call the hangout Init function
  }
  function sanitize(msg) {
    return msg.replace(/</g, '&lt;');
  }
  function removeVideo(socketId) {
	var video = $('remote' + socketId);
		if (video) {
		  videos.splice(videos.indexOf(video), 1);
		  video.parentNode.removeChild(video);
		}
	}

  var config = {
    var flickr = {
      api_key : '41386f9cfb34101b940afa34f6bfba2f',
      secret : '5dab28f693669ffb'
    }
  }
  return {
  	init:_init
  };
})();