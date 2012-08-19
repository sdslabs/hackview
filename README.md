HackView - Y! HackU IIT-Delhi 2012 Winning Entry
================================================

Our winning entry for Y! HackU involves a multi-person video chat using webRTC to create a Peer-To-Peer video hangout,
which works faster than any other video chat provider. It is ideal for people chatting on the same network 
(such as corporate & university networks).


#References:

##Technologies Used

- [WebRTC](http://www.webrtc.org)
- [Collaborative Editing](http://en.wikipedia.org/wiki/Collaborative_editing)
- [Websockets](http://websocket.org) for fast server-client communication
- [node.js](http://nodejs.org) for powering the backend
- [expressJS](expressjs.com/) for fast, easy webserver in node
- [Responsive Design](http://en.wikipedia.org/wiki/Responsive_Web_Design)


##Libraries Used
- [WebRTC.io](http://github.com.webrtc) for supporting webRTC protocol
- [ShareJS](http://sharejs.org)

##Similar Stuff
- [Google Hangouts](http://www.google.com/tools/dlpage/res/talkvideo/hangouts/)
- [Meetings.io](http://meetings.io) (Uses flash)

#Notes

Since this was developed over a 24 hour hackathon, the code is messy in places. The design is responsive, and should work on most devices (including mobile/tablets). It should degrade to a doc editor + chat for devices without webRTC support (which is just Chrome>=21, Firefox>=17, Opera>=12 at present). The following is the feature set we require for various features:

1. Document Editor: Should work everywhere as it is powered by shareJS which uses BrowserChannel
2. Video Chat: Should work on devices with getUserMedia support
3. Normal Text Chat: It is powered by webRTC.socket, which uses WebSockets internally. I could not get BrowserChannel to work in a separate channel (from shareJS), but that was my first choice. I tried to shift to socket.io, but it caused issues by conflicting with webRTC.socket, so I just used that. This means chat only works in browsers with websocket support
