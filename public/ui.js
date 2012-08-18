var UI=(function(){

	$(document).ready(function hooks(){
		console.log('Hola')
		$('#chat-form').submit(function(e){
			e.preventDefault();
			var val =  $('#chat-edit').val();
			UI.addChatMessage(val);
			console.log( val );
		});
	});
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
	  $('.chatbox').prepend	( chatMessage );

	}
  };
})();