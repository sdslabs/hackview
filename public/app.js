//app.js is the main app loader
//its like controller of the main app
var App=(function(){
  var mode = 'hangout';
  var _createNewRoom = function(){
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    window.location.hash = randomstring;
    window.location.reload();
  }

  function _init(){
    //attach some events at the start	
    $('#newRoom').click(_createNewRoom);
    var ret = Hangout.init();//call the hangout Init function
    //hangout is the full powered mode
    //default is normal browser w/o video chat
    if(ret===false){
      $('#videos').remove();
      mode='default'
    }
    if(Mobile.init()){
      //the mode changes to mobile
      mode='mobile';
    }
    Doc.init();
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

  return {
  	init:_init,
    getMode: function(){
      return mode;
    }
  };
})();