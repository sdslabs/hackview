module.exports=(function(webRTC){
  webRTC.rtc.on('connect', function(rtc) {
    console.log("someone connected");
    //Client connected
  });

  webRTC.rtc.on('send answer', function(rtc) {
    //answer sent
  });

  webRTC.rtc.on('disconnect', function(rtc) {
    //Client disconnect 
  });

  webRTC.rtc.on('chat_msg', function(data, socket) {
    var roomList = webRTC.rtc.rooms[data.room] || [];

    for (var i = 0; i < roomList.length; i++) {
      var socketId = roomList[i];

      if (socketId !== socket.id) {
        var soc = webRTC.rtc.getSocket(socketId);

        if (soc) {
          soc.send(JSON.stringify({
            "eventName": "receive_chat_msg",
            "data": {
              "messages": data.messages,
              "color": data.color
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