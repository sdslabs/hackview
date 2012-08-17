//this file will get removed and be repalced with hangout.js @todo
var videos = [];

function getNumPerRow() {
  var len = videos.length;
  var biggest;

  // Ensure length is even for better division.
  if (len % 2 === 1) {
    len++;
  }

  biggest = Math.ceil(Math.sqrt(len));
  while (len % biggest !== 0) {
    biggest++;
  }
  return biggest;
}

function subdivideVideos() {
  var perRow = getNumPerRow();
  var numInRow = 0;
  for (var i = 0, len = videos.length; i < len; i++) {
    var video = videos[i];
    setWH(video, i);
    numInRow = (numInRow + 1) % perRow;
  }
}

function setWH(video, i) {
  var perRow = getNumPerRow();
  var perColumn = Math.ceil(videos.length / perRow);
  var width = Math.floor((window.innerWidth) / perRow);
  var height = Math.floor((window.innerHeight) / perColumn);
  video.width = width;
  video.height = height;
  video.style.position = "absolute";
  video.style.left = (i % perRow) * width + "px";
  video.style.top = Math.floor(i / perRow) * height + "px";
}

function cloneVideo(domId, socketId) {
  var video = $("#"+domId);
  var clone = video.cloneNode(false);
  clone.id = "remote" + socketId;
  $('#videos').appendChild(clone);
  videos.push(clone);
  return clone;
}
function removeVideo(socketId) {
  var video = $('remote' + socketId);
  if (video) {
      videos.splice(videos.indexOf(video), 1);
      video.parentNode.removeChild(video);
  }
}

function sanitize(msg) {
  return msg.replace(/</g, '&lt;');
}

function initNewRoom() {
  var button = $("#newRoom");

  button.click(function(event) {

      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var string_length = 8;
      var randomstring = '';
      for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
      }
      
      window.location.hash = randomstring;
      location.reload();
  });
}

function init() {
  var room = window.location.hash.slice(1);
  //if you are not in a chatroom, return
  if(room.length===0)
    return;
  if(PeerConnection){
    rtc.createStream({"video": true, "audio": true}, function(stream) {
      $('#you').src = URL.createObjectURL(stream);
      videos.push($('#you'));
      rtc.attachStream(stream, 'you');
      subdivideVideos();
    });
  }else {
    alert('Your browser is not supported or you have to turn on flags. In chrome you go to chrome://flags and turn on Enable PeerConnection remember to restart chrome');
  }
  
  rtc.connect("ws://"+window.location.hostname+":8000/", room);

  rtc.on('add remote stream', function(stream, socketId) {
    console.log("ADDING REMOTE STREAM...");
    var clone = cloneVideo('you', socketId);
    $("#"+clone.id).attr("class", "");
    rtc.attachStream(stream, clone.id);
    subdivideVideos();
  });
  rtc.on('disconnect stream', function(data) {
      console.log('remove ' + data);
      removeVideo(data);
  });
  initNewRoom();
}

window.onresize = function(event) {
  subdivideVideos();
};