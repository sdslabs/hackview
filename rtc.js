module.exports=(function(webRTC){
  var sanitize= require('validator').sanitize;
  webRTC.rtc.on('connect', function(rtc) {
    console.log("someone connected");
    //Client connected
  });

  webRTC.rtc.on('send answer', function(rtc) {
    //answer sent
    console.log("Answer sent");
  });

  webRTC.rtc.on('disconnect', function(rtc) {
    //Client disconnect 
  });

  webRTC.rtc.on('chat_msg', function(data, socket) {
    console.log("HERE");
    console.log(data);
    var roomList = webRTC.rtc.rooms[data.room] || [];
    console.log(roomList);
    for (var i = 0; i < roomList.length; i++) {
      var socketId = roomList[i];

      if (socketId !== socket.id) {
        var soc = webRTC.rtc.getSocket(socketId);

        if (soc) {
          soc.send(JSON.stringify({
            "eventName": "receive_chat_msg",
            "data": {
              "msg": sanitize(data.msg).xss()
            }
          }), function(error) {
            if (error) {
              console.log(error);
            }
          });
        }
      }
    }
  });
})
