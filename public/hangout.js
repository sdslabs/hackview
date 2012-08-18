//Hangout.js
var Hangout=(function(){
  //private variable to hold videos
  var room='';
  //This will include all the rtc stuff
  //once this is called, it will attach to all required events.
  //here
  //Initialize hangouts, returns false if we are not in a chatroom
  function __init() {
    if(PeerConnection){
      rtc.createStream({"video": true, "audio": true}, function(stream) {
        //debugger;
        $('#you').attr('src',URL.createObjectURL(stream));
        rtc.attachStream(stream, $('#you'));
        refreshDisplay();
        window.onresize=refreshDisplay;
      });
    } else {
      return false;
    }
    
    rtc.connect("ws://"+window.location.hostname+":8000/", room);

    rtc.on('add remote stream', function(stream, socketId) {
      var video = $('<video />').attr('rel',socketId).appendTo('#videos')[0];
      rtc.attachStream(stream, video);
      refreshDisplay();
    });
    rtc.on('disconnect stream', function(socketId) {
        $('video[rel="'+socketId+'"]').remove();
    });
    rtc.on('receive_chat_msg', function(data){
      UI.addChatMessage(data.msg);
    })
  };

  function refreshDisplay(){
    var vids=$('#videos video');
    var count = vids.length;
    count=count<1 ? 1:count;
    var maxWidth = 400*count;
    var width = $('#videos').width();
    if(width>maxWidth)
      width=maxWidth;
    var width = width/count;
    var height=3/4*width;
    for(i=0;i<count;i++){
      vids[i].width=width;
      vids[i].height=height;
      $(vids[i]).css('left',i*width+10);
    }
    $('#videos').css('min-height',height);
    var height=window.innerHeight-height-60;
    console.log(height);
    $('#editor').attr('rows',height/parseInt($('#editor').css('line-height'),10));
  }
  function sendChat (message){
    UI.addChatMessage(message);
    rtc._socket.send(JSON.stringify({
      eventName:"chat_msg",
      data:{
        msg:message,
        room:room
      }
    }),function(err){
      console.log(err);
    });
  };
  return {
    enterRoom:null,
    leaveRoom:null,
    changeView:null,
    init:__init,
    chat:sendChat
  };
})();