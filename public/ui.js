var UI=(function(){
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
	  console.log(msg);
	}
  };
})();