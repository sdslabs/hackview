/**
 * This is the UI module and handles UI changes
 */
var UI=(function(){
  $(document).ready(function hooks(){
	  $('#chat-form').submit(function(e){
		e.preventDefault();
		var val =  $('#chat-edit').val();
		$('#chat-edit').val('');
		Hangout.chat(val);
		//UI.addChatMessage(val);
	  });
  });

  //Function to refresh the UI depending on various things
  function _refresh(){
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
      $(vids[i]).css('left',i*width);
    }
    $('#videos').css('min-height',height);
    var height=window.innerHeight-height-60;
    $('#editor').attr('rows',height/parseInt($('#editor').css('line-height'),10));
    $('#preview').css('height',height+10);
  }

  //this will handle the UI Portions
  return {
  	//this changes view to particular contact
    changeView:null,
    //returns whether we are viewing this in single Theater Mode
    getMode:  function(){
	  return $('#theatre').is(':checked');
	},
	addChatMessage:function(msg){
	  //@todo Add this to the window as a div
	  //when we have the interface
	  var chatMessage = $('<div/>').attr('class','chat-message').text( msg )
	  $('#overview').after( chatMessage );

	},
    refresh:_refresh
  };
})();