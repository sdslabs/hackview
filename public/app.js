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
  }

  return {
  	init:_init
  };
})();