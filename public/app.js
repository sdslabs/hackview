//app.js is the main app loader
//its like controller of the main app
var App=(function(){
  var mode = 'hangout',nick='';
  var room = window.location.pathname.split('/')[2];
  function _init(){
    UI.init (function() {
      Doc.init(); //should be available on most browsers (websockets)
      UI.refresh();
    });
  }
  /** Configuration for our API usage */
  var config = {
    flickr : {
      api_key : '41386f9cfb34101b940afa34f6bfba2f',
      secret : '5dab28f693669ffb'
    },
    boss : {
      api_key : 'dj0yJmk9YWF3ODdGNWZPYjg2JmQ9WVdrOWVsWlZNRk5KTldFbWNHbzlNVEEyTURFNU1qWXkmcz1jb25zdW1lcnNlY3JldCZ4PTUz',
      secret : ' a3d93853ba3bad8a99a175e8ffa90a702cd08cfa'
    }
  };
  function getNick() {
   var cookie = document.cookie;
   var nameEQ = "nick=";
   var ca = cookie.split(';');
   var len = ca.length;
   for (var i = 0; i < len; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }
   return 'anonymous';
  };
  return {
  	init:_init,
    getRoom: function(){
      return room;
    },
    getNick:getNick
  };
})();