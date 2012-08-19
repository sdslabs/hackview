//app.js is the main app loader
//its like controller of the main app
var App=(function(){
  var mode = 'hangout',room='';


  function _init(){
    //if you are not in a chatroom, return
    //var ret = Hangout.init();//call the hangout Init function
    //hangout is the full powered mode
    //default is normal browser w/o video chat
    var path = window.location.pathname.split('/');
    room=path[2];
    Doc.init (function() {
      var ret = Hangout.init();
        if(ret===false){
        $('#videos').remove();
        mode='default'
      }
      if(Mobile.init()){
        //the mode changes to mobile
        mode='mobile';
      }
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

  return {
  	init:_init,
    getMode: function(){
      return mode;
    },
    getRoom: function(){
      return room;
    }
  };
})();