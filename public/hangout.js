//Hangout.js
var Hangout=(function(){
  //private variable to hold videos
  //This will include all the rtc stuff
  //once this is called, it will attach to all required events.
  //here
  //Initialize hangouts, returns false if we are not in a chatroom
  function __init() {
    if(PeerConnection){
      rtc.createStream({"video": true, "audio": true}, function(stream) {
        $('#you').attr('src',URL.createObjectURL(stream));
        rtc.attachStream(stream, $('#you'));
        UI.refresh();
      });
    } else {
      return false;
    }

    rtc.connect("ws://"+window.location.hostname+":8000/", App.getRoom());

    rtc.on('add remote stream', function(stream, socketId) {
      var video = $('<video />').attr('rel',socketId).appendTo('#videos')[0];
      rtc.attachStream(stream, video);
      UI.refresh();
    });
    rtc.on('disconnect stream', function(socketId) {
        $('video[rel="'+socketId+'"]').remove();
    });
    rtc.on('receive_chat_msg', function(data){
      UI.addChatMessage(data.msg);
    })
  };

  //Sends chat using rtc sockets
  function sendChat (message){
    UI.addChatMessage(message);
    rtc._socket.send(JSON.stringify({
      eventName:"chat_msg",
      data:{
        msg:message,
        room:App.getRoom()
      }
    }),function(err){
      console.log(err);
    });
  };

  return {
    init:__init,
    chat:sendChat
  };
})();